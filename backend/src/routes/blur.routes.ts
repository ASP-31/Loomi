import express from "express";
import { upload } from "../middleware/upload.middleware";
import { blurBrushController } from "../controllers/blur.controller";

const router = express.Router();

router.post(
    "/",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "mask", maxCount: 1 }
    ]),
    blurBrushController
);

export default router;