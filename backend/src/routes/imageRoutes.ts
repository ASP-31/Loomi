import express from "express";
import multer from "multer";
import { applyImageFilter } from "../controllers/imageController";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/filter", upload.single("image"), applyImageFilter);

export default router;