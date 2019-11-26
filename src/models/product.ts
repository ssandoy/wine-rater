export default interface WineProduct {
  basic: {
    productId: string;
    productShortName: string;
    productLongName: string;
    volume: number;
    alcoholContent: number;
    vintage: string;
    ageLimit: string;
    packagingMaterialId: string;
    packagingMaterial: string;
    volumTypeId: string;
    volumType: string;
    corkTypeId: string;
    corkType: string;
    bottlePerSalesUnit: string;
    introductionDate: string;
    productStatusSaleId: string;
    productStatusSaleName: string;
    productStatusSaleValidFrom: string;
  };
  logistics: {
    barcodes: [
      {
        gtin: string;
        isMainGtin: true;
      }
    ];
    orderPack: string;
    minimumOrderQuantity: number;
    packagingWeight: number;
  };
  origins: {
    origin: {
      countryId: string;
      country: string;
      regionId: string;
      region: string;
      subRegionId: string;
      subRegion: string;
    };
    production: {
      countryId: string;
      country: string;
      regionId: string;
      region: string;
    };
    localQualityClassifId: string;
    localQualityClassif: string;
  };
  properties: {
    ecoLabellingId: string;
    ecoLabelling: string;
    storagePotentialId: string;
    storagePotential: string;
    organic: true;
    biodynamic: true;
    ethicallyCertified: true;
    vintageControlled: true;
    sweetWine: true;
    freeOrLowOnGluten: true;
    kosher: true;
    locallyProduced: true;
    noAddedSulphur: true;
    environmentallySmart: true;
    productionMethodStorage: string;
  };
  classification: {
    mainProductTypeId: string;
    mainProductTypeName: string;
    subProductTypeId: string;
    subProductTypeName: string;
    productTypeId: string;
    productTypeName: string;
    productGroupId: string;
    productGroupName: string;
  };
  ingredients: {
    grapes: [
      {
        grapeId: string;
        grapeDesc: string;
        grapePct: string;
      }
    ];
    ingredients: string;
    sugar: string;
    acid: string;
  };
  description: {
    characteristics: {
      colour: string;
      odour: string;
      taste: string;
    };
    freshness: string;
    fullness: string;
    bitterness: string;
    sweetness: string;
    tannins: string;
    recommendedFood: [
      {
        foodId: string;
        foodDesc: string;
      }
    ];
  };
  assortment: {
    assortmentId: string;
    assortment: string;
    validFrom: string;
    listedFrom: string;
    assortmentGrade: string;
  };
  prices: [
    {
      priceValidFrom: string;
      salesPrice: number;
      salesPricePrLiter: number;
      bottleReturnValue: number;
    }
  ];
  lastChanged: {
    date: string;
    time: string;
  };
}
