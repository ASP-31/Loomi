import sharp from "sharp";

export const blurBrushService = async (
    imageBuffer: Buffer,
    maskBuffer: Buffer
) => {

    const image = sharp(imageBuffer);
    const { width, height } = await image.metadata();

    if (!width || !height) throw new Error("Invalid image");

    const mask = await sharp(maskBuffer)
        .resize(width, height)
        .greyscale()
        .toBuffer();

    const blurred = await sharp(imageBuffer)
        .blur(20)
        .toBuffer();

    const blurredMasked = await sharp(blurred)
        .joinChannel(mask)
        .png()
        .toBuffer();

    const result = await sharp(imageBuffer)
        .composite([
            {
                input: blurredMasked,
                blend: "over"
            }
        ])
        .png()
        .toBuffer();

    return result;
};