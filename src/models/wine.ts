export default interface Wine {
  key?: string;
  apiId?: string;
  wineName: string;
  wineType: string;
  wineYear: string;
  fitsTo: string[];
  ineRating: string;
  sanderRating: string;
  wineGrapes: string[];
  wineRegion: string;
  wineCountry: string;
  winePicture?: string;
  price?: number;
}
