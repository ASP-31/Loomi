from fastapi import FastAPI, UploadFile, File, Query
from fastapi.responses import Response
from rembg import remove
import torch
import cv2
import numpy as np
from PIL import Image
import io

app = FastAPI()

model_type = "MiDaS_small"
midas = torch.hub.load("intel-isl/MiDaS", model_type, trust_repo=True)
midas.to("cpu")
midas.eval()

transform = torch.hub.load("intel-isl/MiDaS", "transforms", trust_repo=True).small_transform


@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):
    input_bytes = await file.read()
    output_bytes = remove(input_bytes)
    return Response(content=output_bytes, media_type="image/png")


@app.post("/depth")
async def generate_depth(
    file: UploadFile = File(...),
    mode: str = Query("color", description="grayscale | color | overlay")
):
    input_bytes = await file.read()

    image = Image.open(io.BytesIO(input_bytes)).convert("RGB")
    img = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    max_width = 512
    if img.shape[1] > max_width:
        scale = max_width / img.shape[1]
        img = cv2.resize(img, None, fx=scale, fy=scale)

    input_batch = transform(img)

    with torch.no_grad():
        prediction = midas(input_batch)
        prediction = torch.nn.functional.interpolate(
            prediction.unsqueeze(1),
            size=img.shape[:2],
            mode="bicubic",
            align_corners=False,
        ).squeeze()

    depth = prediction.cpu().numpy()

    
    depth = cv2.normalize(depth, None, 0, 255, cv2.NORM_MINMAX)
    depth = depth.astype(np.uint8)

    depth = cv2.equalizeHist(depth)

  
    if mode == "grayscale":
        output = depth

    elif mode == "color":
        output = cv2.applyColorMap(depth, cv2.COLORMAP_INFERNO)

    elif mode == "overlay":
        depth_float = depth.astype(np.float32) / 255.0


        blurred = cv2.GaussianBlur(img, (21, 21), 0)

        mask = cv2.normalize(depth_float, None, 0, 1, cv2.NORM_MINMAX)

        mask = cv2.GaussianBlur(mask, (11, 11), 0)

        mask_3c = np.stack([mask]*3, axis=-1)

        output = img * mask_3c + blurred * (1 - mask_3c)
        output = np.clip(output, 0, 255).astype(np.uint8)
    else:
        return Response(
            content=b"Invalid mode. Use grayscale | color | overlay",
            media_type="text/plain",
            status_code=400
        )
    
    _, encoded_img = cv2.imencode(".png", output)

    return Response(
        content=encoded_img.tobytes(),
        media_type="image/png"
    )