import axios from "axios";
import FormData from "form-data";

export async function removeBgWithPython(imageBuffer: Buffer): Promise<Buffer> {
  const formData = new FormData();
  formData.append("file", imageBuffer, {
    filename: "image.png",
    contentType: "image/png",
  });

  const response = await axios.post(
    "http://127.0.0.1:8000/remove-bg",
    formData,
    {
      headers: formData.getHeaders(),
      responseType: "arraybuffer",
    }
  );

  return Buffer.from(response.data);
}