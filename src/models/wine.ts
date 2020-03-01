export default interface Wine {
  // TODO HOW TO HANDLE CASTING TO WINE WHEN KEY IS NOT YET GENERATED?
  key?: string;
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
