import { Request, Response } from "express"
import archiver from "archiver"
import sharp from "sharp"

export const bulkProcess = async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[]

        if (!files || files.length === 0) {
            return res.status(400).json({
                error: "No images uploaded"
            })
        }

        res.setHeader("Content-Type", "application/zip")
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=loomi-bulk-output.zip"
        )

        const archive = archiver("zip", {
            zlib: { level: 9 }
        })

        archive.on("error", (err) => {
            throw err
        })

        archive.pipe(res)

        for (const file of files) {
            const processed = await sharp(file.buffer)
                .jpeg({ quality: 70 })
                .toBuffer()

            const filename =
                file.originalname.split(".")[0] + "-compressed.jpg"

            archive.append(processed, { name: filename })
        }

        archive.finalize()

    } catch (error) {
        console.error("Bulk processing error:", error)

        if (!res.headersSent) {
            res.status(500).json({
                error: "Bulk processing failed"
            })
        }
    }
}