export const validationSchema = {
  wineName: {
    required: true
  },
  wineType: {
    required: true
  },
  wineYear: {
    required: true,
    validator: {
      regEx: /^[0-9]{4}$/,
      error: "Årgangen må være et gyldig år."
    }
  },
  wineCountry: {
    required: true
  },
  sanderRating: {
    required: true,
    validator: {
      regEx: /^[0-9]+([.][0-9]+)?$/,
      error: "Ratingen må være et tall mellom 0-10."
    }
  },
  ineRating: {
    required: true,
    validator: {
      regEx: /^(10|(\d{1}(\.\d{1,2})?))$/,
      error: "Ratingen må være et tall mellom 0.0 og 10.0"
    }
  }
};

export interface iErrors {
  wineName: string;
  wineType: string;
  wineRegion: string;
  wineCountry: string;
  wineYear: string;
  sanderRating: string;
  ineRating;
}

export default validationSchema;
