import { applyFilter } from "../utils/sharpFilters";

export async function processImageFilter(file: Express.Multer.File, filter: string) {
  const buffer = file.buffer;

  const processedImage = await applyFilter(buffer, filter);

  return processedImage;
}