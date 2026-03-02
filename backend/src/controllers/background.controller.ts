import { removeBgWithPython } from "../services/background.service";
import { Request, Response } from "express";

export async function backgroundRemoveController(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const output = await removeBgWithPython(req.file.buffer);

    res.setHeader("Content-Type", "image/png");
    res.send(output);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Background removal failed" });
  }
}