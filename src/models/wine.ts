export default interface Wine {
  key: string;
  apiId?: string;
  wineName: string;
  wineType: string;
  wineYear: number;
  fitsTo: string[];
  ineRating: number;
  sanderRating: number;
  wineGrapes: string[];
  wineRegion: string;
  wineCountry: string;
  winePicture?: string;
}
