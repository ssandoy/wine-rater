export default interface Wine {
  // TODO HOW TO HANDLE CASTING TO WINE WHEN KEY IS NOT YET GENERATED?
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
}
