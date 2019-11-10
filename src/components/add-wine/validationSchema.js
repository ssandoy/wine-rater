module.exports = {
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
  wineRegion: {
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
      regEx: /^[0-9]+([.][0-9]+)?$/,
      error: "Ratingen må være et tall mellom 0-10."
    }
  }
};
