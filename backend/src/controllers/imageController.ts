import { Request, Response } from "express";
import { processImageFilter } from "../services/filterService";

export const applyImageFilter = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const { filter } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = await processImageFilter(file, filter);

    res.set("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Image processing failed" });
  }
};