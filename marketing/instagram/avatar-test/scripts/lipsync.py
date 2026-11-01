"""Redo the mouth of a talking video with LatentSync 1.6, using MediaPipe for face alignment.

Usage: python lipsync.py IN.mp4 VOICE.wav OUT.mp4 [--steps 20] [--guidance 1.5] [--seed 1247]

LatentSync detects faces with insightface, whose pretrained face models are licensed for
non-commercial research only. It only uses the detector for three alignment points (the centre of
each eyebrow and of the nose), so this script swaps in MediaPipe Face Mesh (Apache-2.0) before
LatentSync loads. Needs the venv-ls venv and the bytedance/LatentSync checkout from setup.sh in
$ATC_LATENTSYNC, with checkpoints/latentsync_unet.pt, checkpoints/whisper/tiny.pt and
checkpoints/sd-vae-ft-mse.
"""
import argparse
import os
import pathlib
import sys
import types

import numpy as np

HOME = pathlib.Path.home() / ".cache/atc-avatar"
LATENTSYNC = pathlib.Path(os.environ.get("ATC_LATENTSYNC", HOME / "latentsync"))

ap = argparse.ArgumentParser()
ap.add_argument("video")
ap.add_argument("audio")
ap.add_argument("out")
ap.add_argument("--steps", type=int, default=20)
ap.add_argument("--guidance", type=float, default=1.5)
ap.add_argument("--seed", type=int, default=1247)
args = ap.parse_args()
video, audio, out = (str(pathlib.Path(p).resolve()) for p in (args.video, args.audio, args.out))

sys.path.insert(0, str(LATENTSYNC))
os.chdir(LATENTSYNC)

# MediaPipe Face Mesh points for the image-left eyebrow, image-right eyebrow and nose, which take
# the places of insightface 2d106 points [43, 48, 49, 51, 50], [101..105] and [74, 77, 83, 86]
LEFT_BROW, RIGHT_BROW, NOSE = [70, 63, 105, 66, 107], [336, 296, 334, 293, 300], [195, 5, 4, 1]


class FaceDetector:
    def __init__(self, device="cuda"):
        import mediapipe as mp
        self.mesh = mp.solutions.face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1,
                                                    refine_landmarks=False, min_detection_confidence=0.5)

    def __call__(self, frame, threshold=0.5):
        h, w, _ = frame.shape
        found = self.mesh.process(np.ascontiguousarray(frame)).multi_face_landmarks
        if not found:
            return None, None
        pts = np.array([[p.x * w, p.y * h] for p in found[0].landmark])
        lmk = np.zeros((106, 2))
        lmk[[43, 48, 49, 51, 50]] = pts[LEFT_BROW].mean(axis=0)
        lmk[101:106] = pts[RIGHT_BROW].mean(axis=0)
        lmk[[74, 77, 83, 86]] = pts[NOSE].mean(axis=0)
        x1, y1 = pts.min(axis=0)
        x2, y2 = pts.max(axis=0)
        return (int(x1), int(y1), int(x2), int(y2)), lmk


# Stand in for latentsync.utils.face_detector before anything imports it (it imports insightface)
sys.modules["latentsync.utils.face_detector"] = types.SimpleNamespace(FaceDetector=FaceDetector)

from diffusers import AutoencoderKL  # noqa: E402
from omegaconf import OmegaConf  # noqa: E402

_vae_from_pretrained = AutoencoderKL.from_pretrained
AutoencoderKL.from_pretrained = lambda name, **kw: _vae_from_pretrained(
    "checkpoints/sd-vae-ft-mse" if name == "stabilityai/sd-vae-ft-mse" else name, **kw)

from scripts.inference import main  # noqa: E402

config = OmegaConf.load("configs/unet/stage2_512.yaml")
main(config, argparse.Namespace(
    inference_ckpt_path="checkpoints/latentsync_unet.pt", video_path=video, audio_path=audio,
    video_out_path=out, inference_steps=args.steps, guidance_scale=args.guidance,
    temp_dir=str(HOME / "latentsync-temp"), seed=args.seed, enable_deepcache=True,
))
