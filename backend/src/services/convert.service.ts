import sharp from "sharp";

const allowedFormats = [
    "png",
    "jpeg",
    "webp",
    "avif",
    "gif",
    "tiff",
];

export const convertImage = async (
    buffer: Buffer,
    format: string
): Promise<Buffer> => {
    if (!allowedFormats.includes(format)) {
        throw new Error("Invalid format selected");
    }

    let image = sharp(buffer);

    switch (format) {
        case "png":
            image = image.png();
            break;
        case "jpeg":
            image = image.jpeg();
            break;
        case "webp":
            image = image.webp();
            break;
        case "avif":
            image = image.avif();
            break;
        case "gif":
            image = image.gif();
            break;
        case "tiff":
            image = image.tiff();
            break;
        default:
            throw new Error("Invalid format selected");
    }

    return await image.toBuffer();
};