"""ComfyUI custom node that only patches torch: every F.conv3d runs as conv2d calls on ROCm.

Symlink this folder into ComfyUI/custom_nodes and start ComfyUI with COMFYUI_ENABLE_MIOPEN=1
(ComfyUI turns MIOpen off on AMD by default, and the conv2d route needs it). See rocm_conv3d.py.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
from rocm_conv3d import patch_torch  # noqa: E402

patch_torch()
NODE_CLASS_MAPPINGS = {}
