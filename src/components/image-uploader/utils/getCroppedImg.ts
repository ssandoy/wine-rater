import { Crop } from "react-image-crop";

export function getCroppedImg(image: HTMLImageElement, crop: Crop, fileName: string) : Promise<Blob> {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");
  if (ctx && crop && crop.x && crop.y && crop.width && crop.height) {
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
  }

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // @ts-expect-error err
            blob.name = fileName; // eslint-disable-line no-param-reassign
            resolve(blob);
          }
        },
        "image/jpeg",
        1,
      );
    } catch (err) {
      reject(err);
    }
  });
}
