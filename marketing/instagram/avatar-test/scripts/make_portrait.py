"""Generate candidate presenter portraits (a woman who does not exist) with RealVisXL V5.

Usage: python make_portrait.py OUT_DIR [N] [FIRST_SEED]

Writes OUT_DIR/portrait-<seed>.png at 768x1344 (9:16-ish, SDXL native).
Needs the venv from setup.sh and models in $ATC_MODELS (default ~/.cache/atc-avatar/models).
"""
import copy
import os
import pathlib
import sys

import torch
from diffusers import DPMSolverMultistepScheduler, StableDiffusionXLPipeline

MODELS = pathlib.Path(os.environ.get("ATC_MODELS", pathlib.Path.home() / ".cache/atc-avatar/models"))
out_dir = pathlib.Path(sys.argv[1])
n = int(sys.argv[2]) if len(sys.argv) > 2 else 8
first = int(sys.argv[3]) if len(sys.argv) > 3 else 1000
out_dir.mkdir(parents=True, exist_ok=True)

# Kept under CLIP's 77-token limit; anything past it is silently dropped
PROMPT = (
    "RAW photo, medium shot of a 30 year old Indian woman presenter in her home office, "
    "bookshelf and plant softly blurred behind her, soft window light, calm warm smile, "
    "looking at camera, head to waist in frame, cream cotton kurta and navy blazer, "
    "natural skin texture, 50mm f/2.8"
)
NEGATIVE = (
    "cartoon, illustration, 3d render, cgi, painting, anime, plastic skin, airbrushed, "
    "heavy makeup, glamour, fashion model pose, cleavage, jewellery overload,"
    "teeth showing, open mouth, deformed hands, extra fingers, deformed, extra limbs, blurry, low quality, "
    "watermark, text, logo, tilted head, looking away"
)

pipe = StableDiffusionXLPipeline.from_pretrained(
    MODELS / "RealVisXL_V5.0", torch_dtype=torch.float16, variant="fp16", use_safetensors=True
).to("cuda")
pipe.scheduler = DPMSolverMultistepScheduler.from_config(
    pipe.scheduler.config, use_karras_sigmas=True, algorithm_type="sde-dpmsolver++"
)
vae_cpu = copy.deepcopy(pipe.vae).to("cpu", torch.float32)

for seed in range(first, first + n):
    latents = pipe(
        PROMPT, negative_prompt=NEGATIVE, width=768, height=1344,
        num_inference_steps=30, guidance_scale=4.5,
        generator=torch.Generator("cuda").manual_seed(seed), output_type="latent",
    ).images
    # On ROCm (gfx1201) every GPU conv path for the full-size VAE layers wants a 4-7 GiB buffer and
    # runs out of memory, even tiled, so the VAE decodes on the CPU in fp32 (about half a minute)
    with torch.no_grad():
        decoded = vae_cpu.decode(latents.cpu().float() / vae_cpu.config.scaling_factor).sample
    image = pipe.image_processor.postprocess(decoded, output_type="pil")[0]
    path = out_dir / f"portrait-{seed}.png"
    image.save(path)
    print(f"Wrote {path}")
