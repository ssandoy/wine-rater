import { getWine } from "api/api";
import type WineProduct from "models/product";
import { useEffect, useState } from "react";
import { convertVinmonopoletPictureSize } from "utils/string-utils";
import styles from "./wine-details.module.css";

const MAX_UNEXPANDED_ROWS = 2;

const WineDetailsComponent = ({ wineProduct }: WineDetailsProps) => {
  const [winePicture, setWinePicture] = useState<string>("");
  const [pictureError, setPictureError] = useState(false);
  const [isGrapesExpanded, setIsGrapesExpanded] = useState(false);
  const toggleOpen = (): void => {
    setIsGrapesExpanded(!isGrapesExpanded);
  };

  useEffect(() => {
    let isCurrent = true;
    setWinePicture("");
    setPictureError(false);

    getWine(wineProduct.basic.productId)
      .then((wineDetails) => {
        if (!isCurrent) {
          return;
        }

        setWinePicture(
          convertVinmonopoletPictureSize(wineDetails.images[1]?.url, 800)
        );
      })
      .catch((error) => {
        console.error("Failed to fetch wine picture", error);
        if (isCurrent) {
          setPictureError(true);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [wineProduct.basic.productId]);

  return (
    <div className={styles["wine-details-container"]}>
      <div className={styles["wine-details-title"]}>
        <p>{wineProduct.basic.productShortName}</p>
      </div>
      <div className={styles["wine-details-item-col-1"]}>
        <span>Type</span>
        <p>{wineProduct.classification.productTypeName}</p>
      </div>
      <div className={styles["wine-details-item-col-2"]}>
        <span>Årgang</span>
        <p>{wineProduct.basic.vintage}</p>
      </div>
      <div className={styles["wine-details-item-col-1"]}>
        <span>Land, region</span>
        <p>
          {wineProduct.origins.origin.country},{" "}
          {wineProduct.origins.origin.region}
        </p>
      </div>
      <div className={styles["wine-details-item-col-2"]}>
        <span>Druer</span>
        <button
          type="button"
          className={styles["wine-details-grapes"]}
          onClick={toggleOpen}
        >
          {wineProduct.ingredients.grapes.map((grape, idx) => {
            if (!isGrapesExpanded && idx > MAX_UNEXPANDED_ROWS) {
              return null;
            }
            const styles = idx !== 0 ? { margin: 0 } : { marginBottom: 0 };
            return (
              <span style={styles} key={grape.grapeId}>
                {grape.grapeDesc}
                {idx === MAX_UNEXPANDED_ROWS && !isGrapesExpanded && "..."}
              </span>
            );
          })}
        </button>
      </div>
      <div className={styles["wine-details-row-item"]}>
        <span>Smak</span>
        <p>{wineProduct.description.characteristics.taste}</p>
      </div>
      <div className={styles["wine-details-row-item"]}>
        <span>Lukt</span>
        <p>{wineProduct.description.characteristics.odour}</p>
      </div>
      <div className={styles["wine-details-item-col-1"]}>
        <span>Alkoholprosent</span>
        <p>{wineProduct.basic.alcoholContent}%</p>
      </div>
      <div className={styles["wine-details-item-col-2"]}>
        <span>Pris</span>
        <p>{Math.ceil(wineProduct.prices[0]?.salesPrice)} kr</p>
      </div>
      <div className={styles["wine-details-row-item"]}>
        <span>Passer til</span>
        <p>
          {wineProduct.description.recommendedFood
            .map((food, idx) =>
              idx !== 0 ? food.foodDesc?.toLocaleLowerCase() : food.foodDesc
            )
            .join(", ")}
        </p>
      </div>
      <div className={styles["wine-details-row-item"]}>
        {winePicture && (
          <img
            src={winePicture as string}
            className="wine-picture"
            alt="wine"
          />
        )}
        {pictureError && (
          <p className={styles["wine-details-error"]} role="alert">
            Kunne ikke laste vinbildet.
          </p>
        )}
      </div>
    </div>
  );
};

type WineDetailsProps = {
  wineProduct: WineProduct;
};

export default WineDetailsComponent;
