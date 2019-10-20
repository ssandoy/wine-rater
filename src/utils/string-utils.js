export const convertVinmonopoletPictureSize = (url, size) => {
  return url.replace("300x300", `${size}x${size}`);
};
