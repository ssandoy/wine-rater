import { getWine } from "api/api";
import ErrorBoundary from "components/error-boundary/ErrorBoundary";
import type WineProduct from "models/product";
import { Suspense, use, useState } from "react";
import { convertVinmonopoletPictureSize } from "utils/string-utils";
import styles from "./wine-details.module.css";

const MAX_UNEXPANDED_ROWS = 2;

// use() needs the same promise across renders, so requests are cached per
// product. Failed requests are evicted by the error boundary so the next visit
// retries.
const winePictureRequests = new Map<string, Promise<string>>();

const requestWinePicture = (productId: string) => {
  const request = getWine(productId).then((wineDetails) =>
    convertVinmonopoletPictureSize(wineDetails.images[1]?.url, 800)
  );
  winePictureRequests.set(productId, request);
  return request;
};

const fetchWinePicture = (productId: string) =>
  winePictureRequests.get(productId) ?? requestWinePicture(productId);

const WinePicture = ({ productId }: { productId: string }) => {
  const winePicture = use(fetchWinePicture(productId));
  return winePicture ? (
    <img src={winePicture} className="wine-picture" alt="wine" />
  ) : null;
};

const WineDetailsComponent = ({ wineProduct }: WineDetailsProps) => {
  const [isGrapesExpanded, setIsGrapesExpanded] = useState(false);
  const toggleOpen = (): void => {
    setIsGrapesExpanded(!isGrapesExpanded);
  };

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
        <ErrorBoundary
          key={wineProduct.basic.productId}
          fallback={
            <p className={styles["wine-details-error"]} role="alert">
              Kunne ikke laste vinbildet.
            </p>
          }
          onError={(error) => {
            console.error("Failed to fetch wine picture", error);
            winePictureRequests.delete(wineProduct.basic.productId);
          }}
        >
          <Suspense fallback={null}>
            <WinePicture productId={wineProduct.basic.productId} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

type WineDetailsProps = {
  wineProduct: WineProduct;
};

export default WineDetailsComponent;
