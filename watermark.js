import Jimp from "jimp";
import path from "path";
import { fileURLToPath } from "url";


async function addWatermark(imagePath, outputPath, watermarkText) {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const imagefile = path.join(__dirname, imagePath);
    const watermarkedimage = path.join(__dirname, 'public', 'images', outputPath);
    const image = await Jimp.read(imagefile);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE); // Fixing here

    const imageWidth = image.bitmap.width;
    const imageHeight = image.bitmap.height;
    
    const watermarkSpacingX = 1000;
    const watermarkSpacingY = 500;

    // Create watermark layer with correct parameters
    const watermarkLayer = new Jimp(imageWidth, imageHeight, 0x00000000);

    // Rest of the watermark pattern code remains the same
    for (let y = 0; y < imageHeight; y += watermarkSpacingY) {
      for (
        let x = (y / watermarkSpacingY) % 2 === 0 ? 0 : watermarkSpacingX / 2;
        x < imageWidth;
        x += watermarkSpacingX
      ) {
        watermarkLayer.print(font, x, y, watermarkText);
      }
    }

    watermarkLayer.opacity(0.5);
    image.composite(watermarkLayer, 0, 0);

    await image.write(watermarkedimage);
    console.log("Watermark added successfully!");
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

export default addWatermark;