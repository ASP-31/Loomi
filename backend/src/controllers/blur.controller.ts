import { Request, Response } from "express";
import { blurBrushService } from "../services/blur.service";

export const blurBrushController = async (req: Request, res: Response) => {
    try {

        const files = req.files as {
            image?: Express.Multer.File[];
            mask?: Express.Multer.File[];
        };

        if (!files?.image || !files?.mask) {
            return res.status(400).json({ error: "Image and mask required" });
        }

        const imageBuffer = files.image[0].buffer;
        const maskBuffer = files.mask[0].buffer;

        const output = await blurBrushService(imageBuffer, maskBuffer);

        res.set("Content-Type", "image/png");
        res.send(output);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Blur brush processing failed" });
    }
};