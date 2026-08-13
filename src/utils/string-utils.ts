export const convertVinmonopoletPictureSize = (
  url: string | undefined,
  size: number
): string => url?.replace("300x300", `${size}x${size}`) ?? "";
