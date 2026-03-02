import { Request, Response } from "express";
import { removeBg } from "../services/background.service";


export async function backgroundRemoveController(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const allowed = ["image/jpeg", "image/png", "image/webp"];

        if (!allowed.includes(req.file.mimetype)) {
            return res.status(400).json({ error: "Unsupported format" });
        }


        const output = await removeBg(req.file.buffer);

        res.setHeader("Content-Type", "image/png");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=removed-bg.png"
        );

        res.send(output);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Background removal failed" });
    }
}