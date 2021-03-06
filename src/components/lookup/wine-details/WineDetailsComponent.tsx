import React, { useEffect, useState } from "react";
import WineProduct from "models/product";
import "./wine-details.scss";
import { getWine } from "api/api";
import { convertVinmonopoletPictureSize } from "utils/string-utils";

const MAX_UNEXPANDED_ROWS = 2;

const WineDetailsComponent = ({ wineProduct }: WineDetailsProps) => {
  const [winePicture, setWinePicture] = useState<string>("");
  const [isGrapesExpanded, setIsGrapesExpanded] = useState(false);
  const toggleOpen = (): void => {
    setIsGrapesExpanded(!isGrapesExpanded);
  };

  const getWinePicture = async (wineId: string) => {
    const wineDetails = await getWine(wineId);
    setWinePicture(
      convertVinmonopoletPictureSize(wineDetails.images[1]?.url, 800)
    );
  };

  useEffect(() => {
    getWinePicture(wineProduct.basic.productId);
  }, [wineProduct.basic.productId]);

  return (
    <div className="wine-details-container">
      <div className="wine-details-title">
        <p>{wineProduct.basic.productShortName}</p>
      </div>
      <div className="wine-details-item-col-1">
        <label>Type</label>
        <p>{wineProduct.classification.productTypeName}</p>
      </div>
      <div className="wine-details-item-col-2">
        <label>Årgang</label>
        <p>{wineProduct.basic.vintage}</p>
      </div>
      <div className="wine-details-item-col-1">
        <label>Land, region</label>
        <p>
          {wineProduct.origins.origin.country},{" "}
          {wineProduct.origins.origin.region}
        </p>
      </div>
      <div className="wine-details-item-col-2">
        <label>Druer</label>
        <div onClick={toggleOpen}>
          {wineProduct.ingredients.grapes.map((grape, idx) => {
            if (!isGrapesExpanded && idx > MAX_UNEXPANDED_ROWS) {
              return null;
            }
            const styles = idx !== 0 ? { margin: 0 } : { marginBottom: 0 };
            return (
              <p style={styles} key={grape.grapeId}>
                {grape.grapeDesc}
                {idx === MAX_UNEXPANDED_ROWS && !isGrapesExpanded && "..."}
              </p>
            );
          })}
        </div>
      </div>
      <div className="wine-details-row-item">
        <label>Smak</label>
        <p>{wineProduct.description.characteristics.taste}</p>
      </div>
      <div className="wine-details-row-item">
        <label>Lukt</label>
        <p>{wineProduct.description.characteristics.odour}</p>
      </div>
      <div className="wine-details-item-col-1">
        <label>Alkoholprosent</label>
        <p>{wineProduct.basic.alcoholContent}%</p>
      </div>
      <div className="wine-details-item-col-2">
        <label>Pris</label>
        <p>{Math.ceil(wineProduct.prices[0]?.salesPrice)} kr</p>
      </div>
      <div className="wine-details-row-item">
        <label>Passer til</label>
        <p>
          {wineProduct.description.recommendedFood
            .map((food, idx) =>
              idx !== 0 ? food.foodDesc?.toLocaleLowerCase() : food.foodDesc
            )
            .join(", ")}
        </p>
      </div>
      <div className="wine-details-row-item">
        {winePicture && (
          <img
            src={winePicture as string}
            className="wine-picture"
            alt="wine"
          />
        )}
      </div>
    </div>
  );
};

type WineDetailsProps = {
  wineProduct: WineProduct;
};

export default WineDetailsComponent;
