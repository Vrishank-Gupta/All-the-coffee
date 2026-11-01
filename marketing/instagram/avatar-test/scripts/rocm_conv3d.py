"""Run the Wan VAE's causal 3D convolutions as sums of 2D convolutions.

On ROCm 7.0 with an RX 9070 XT (gfx1201), MIOpen has no fast conv3d kernels for the Wan VAE's
shapes: encoding and decoding 17 frames at 576x1008 takes about 290 s, and turning MIOpen off runs
out of memory. A 3D convolution with a temporal kernel of size kt is the sum of kt 2D convolutions,
one per temporal slice of the kernel, applied to the matching (shifted) input frames, and MIOpen's
2D kernels are fast. The result is the same up to floating point rounding.
"""
import torch
import torch.nn.functional as F

_conv3d = F.conv3d


def _triple(v):
    return tuple(v) if isinstance(v, (tuple, list)) else (v, v, v)


def conv3d_2d(x, weight, bias, stride, padding, dilation, groups):
    """F.conv3d as kt conv2d calls. x is B C T H W; stride/padding/dilation are triples."""
    if padding[0]:
        x = F.pad(x, (0, 0, 0, 0, padding[0], padding[0]))
    kt = weight.shape[2]
    st, dt = stride[0], dilation[0]
    b, c, t, h, w = x.shape
    t_out = (t - dt * (kt - 1) - 1) // st + 1
    out = None
    for k in range(kt):
        frames = x[:, :, k * dt: k * dt + st * (t_out - 1) + 1: st]
        frames = frames.transpose(1, 2).reshape(b * t_out, c, h, w)
        y = F.conv2d(frames, weight[:, :, k], None, stride[1:], padding[1:], dilation[1:], groups)
        if out is None:
            out = y
        else:
            out += y
    if bias is not None:
        out += bias.view(1, -1, 1, 1)
    return out.reshape(b, t_out, *out.shape[1:]).transpose(1, 2)


def conv3d_as_2d(conv, x):
    """Apply an nn.Conv3d module through conv3d_2d."""
    return conv3d_2d(x, conv.weight, conv.bias, conv.stride, conv.padding, conv.dilation, conv.groups)


def conv3d(input, weight, bias=None, stride=1, padding=0, dilation=1, groups=1):
    """Drop-in for F.conv3d that takes the conv2d route on the GPU."""
    if not input.is_cuda or isinstance(padding, str):
        return _conv3d(input, weight, bias, stride, padding, dilation, groups)
    unbatched = input.dim() == 4
    x = input[None] if unbatched else input
    out = conv3d_2d(x, weight, bias, _triple(stride), _triple(padding), _triple(dilation), groups)
    return out[0] if unbatched else out


def patch_torch():
    """Route every F.conv3d call (nn.Conv3d included) through conv3d."""
    F.conv3d = conv3d


def patch_wan_vae():
    """Swap CausalConv3d's final conv3d call for conv3d_as_2d (echomimic_v3 src/wan_vae.py)."""
    from src import wan_vae

    def forward(self, x, cache_x=None):
        padding = list(self._padding)
        if cache_x is not None and self._padding[4] > 0:
            x = torch.cat([cache_x.to(x.device), x], dim=2)
            padding[4] -= cache_x.shape[2]
        return conv3d_as_2d(self, F.pad(x, padding))

    wan_vae.CausalConv3d.forward = forward
