import sharp from "sharp";

export async function applyFilter(buffer: Buffer, filter: string) {
  let image = sharp(buffer);

  switch (filter) {
    case "bw":
      return image.grayscale().toBuffer();

    case "warm":
      return image.modulate({
        brightness: 1.05,
        saturation: 1.2,
      }).tint("#ffb27a").toBuffer();

    case "cool":
      return image.modulate({
        brightness: 1,
        saturation: 1.1,
      }).tint("#7ab6ff").toBuffer();

    case "sepia":
      return image.tint("#704214").toBuffer();

    case "bright":
      return image.modulate({
        brightness: 1.3
      }).toBuffer();

    default:
      return image.toBuffer();
  }
}