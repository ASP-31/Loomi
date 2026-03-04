import sharp from "sharp";

export const blurBrushService = async (buffer: Buffer) => {

    const image = sharp(buffer);

    const metadata = await image.metadata();

    const format = metadata.format || "png";

    const blurred = await image
        .blur(15)
        .toFormat(format as keyof sharp.FormatEnum)
        .toBuffer();

    return blurred;
};