export default class Wine {
  id: string;
  name: string;
  type: string;
  year: number;
  fitsTo: string[];
  ineRating: number;
  sanderRating: number;
  grapes: string[];
  region: string;
  country: string;
  image_url?: string;

  constructor({ wineJson }: { wineJson: any }) {
    this.id = wineJson.key;
    this.name = wineJson.wineName;
    this.type = wineJson.wineType;
    this.year = wineJson.wineYear;
    this.fitsTo = wineJson.fitsTo;
    this.ineRating = wineJson.ineRating;
    this.sanderRating = wineJson.sanderRating;
    this.grapes = wineJson.wineGrapes;
    this.region = wineJson.wineRegion;
    this.country = wineJson.wineCountry;
    // TODO: UPDATE THIS AS IMAGE IS IMPLEMENTED.
    this.image_url = wineJson.winePicture;
  }
}
