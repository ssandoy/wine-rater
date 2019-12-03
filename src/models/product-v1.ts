export default interface WineProductV1 {
  name: string;
  images: imageInterface[];
  main_category: {
    name: string;
  };
}

interface imageInterface {
  format: string;
  imageType: string;
  url: string;
}
