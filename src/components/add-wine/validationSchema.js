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
      error: "Invalid Wine year"
    }
  },
  wineCountry: {
    required: true,
    validator: {
      regEx: /^[a-zA-Z\s]+$/,
      error: "Invalid Wine country"
    }
  },
  wineGrape: {
    required: true,
    validator: {
      regEx: /^[a-zA-Z\s]+$/,
      error: "Invalid Wine grape"
    }
  },
  wineRegion: {
    required: true,
    validator: {
      regEx: /^[a-zA-Z\s]+$/,
      error: "Invalid Wine region"
    }
  },
  sanderRating: {
    required: true,
    validator: {
      regEx: /^([0-9]|10)(\.\d{1,2})$/,
      error: "Invalid Wine rating"
    }
  },
  ineRating: {
    required: true,
    validator: {
      regEx: /^([0-9]|10)(\.\d{1,2})$/,
      error: "Invalid Wine rating"
    }
  }
};
