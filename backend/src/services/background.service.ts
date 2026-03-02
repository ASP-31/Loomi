import { removeBackground } from "@imgly/background-removal-node";

export async function removeBg(imageBuffer: Buffer): Promise<Buffer> {
    const output = await removeBackground(imageBuffer, {
        model: "medium",
    });

    return Buffer.from(output);
}