import { PixelCrop } from "react-image-crop";

export function getCroppedImg(
  image: HTMLImageElement,
  crop: PixelCrop,
  fileName: string
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const cropWidth = Number(crop.width);
  const cropHeight = Number(crop.height);
  canvas.width = cropWidth;
  canvas.height = cropHeight;
  const ctx = canvas.getContext("2d");
  if (
    !ctx ||
    crop.x === undefined ||
    crop.y === undefined ||
    !cropWidth ||
    !cropHeight
  ) {
    return Promise.reject(new Error("Invalid image crop"));
  }

  ctx.drawImage(
    image,
    Number(crop.x) * scaleX,
    Number(crop.y) * scaleY,
    cropWidth * scaleX,
    cropHeight * scaleY,
    0,
    0,
    cropWidth,
    cropHeight
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob(
        blob => {
          if (blob) {
            resolve(new File([blob], fileName, { type: blob.type }));
          } else {
            reject(new Error("Could not create cropped image"));
          }
        },
        "image/jpeg",
        1
      );
    } catch (err) {
      reject(err);
    }
  });
}
