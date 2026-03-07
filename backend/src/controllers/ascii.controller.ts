import { Request, Response } from "express";
import { imageToAscii } from "../services/ascii.service";

export async function asciiController(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const ascii = await imageToAscii(req.file.buffer);

        res.json({ ascii });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "ASCII conversion failed" });
    }
}