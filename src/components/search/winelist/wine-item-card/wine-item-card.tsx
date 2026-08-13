import { imageSources, isImageKey } from "images";
import noIconRed from "images/no_icon_red.png";
import type Wine from "models/wine";
import type React from "react";
import { formatAmount } from "../../../../utils/formatAmount";
import styles from "./wine-item-card.module.css";
import WineItemCardInfoTextItem from "./wine-item-card-info-text-item";

interface WineItemCardProps {
  wine: Wine;
}

const WineItemCard: React.FunctionComponent<WineItemCardProps> = ({
  wine,
}: WineItemCardProps) => {
  const image = wine.winePicture ? wine.winePicture : noIconRed;
  return (
    <div className={styles["wine-item-card"]}>
      <div className={styles["wine-item-card__card-header"]}>
        <p className={styles["wine-item-card__header-paragraph"]}>
          {wine.wineName}
        </p>
      </div>
      <div className={styles["wine-item-card__card-body"]}>
        <div
          className={`${styles["wine-item-card__card-body-col-1"]} ${styles["wine-item-card__card-body-row-1"]}`}
        >
          <img className={styles["wine-image"]} alt="wine" src={image}></img>
        </div>
        <div
          className={`${styles["wine-item-card__card-body-col-2"]} ${styles["wine-item-card__card-body-row-1"]}`}
        >
          <WineItemCardInfoTextItem label="Type" value={wine.wineType} />
          <WineItemCardInfoTextItem label="Årgang" value={wine.wineYear} />
          <WineItemCardInfoTextItem label="Land" value={wine.wineCountry} />
          <WineItemCardInfoTextItem label="Region" value={wine.wineRegion} />
          <WineItemCardInfoTextItem
            label="Druer"
            value={wine?.wineGrapes.join(", ")}
          />
          <WineItemCardInfoTextItem
            label="Pris"
            value={wine.price ? formatAmount(wine.price) : "Ukjent"}
          />
        </div>
        <div className={styles["wine-item-card__card-body-wine-row"]}>
          <p className={styles["wine-item-card__label"]}>Passer til</p>
        </div>
        <div className={styles["wine-item-card__card-body-wine-row"]}>
          {wine.fitsTo?.map((item) => {
            if (!isImageKey(item)) {
              return null;
            }

            return (
              <img
                key={imageSources[item]}
                className={styles["fits-to-image"]}
                src={imageSources[item]}
                alt="wine"
              />
            );
          })}
        </div>
        <div className={styles["wine-item-card__card-body-line-row"]}>
          <hr />
        </div>
        <div className={styles["wine-item-card__card-body-wine-row"]}>
          <p className={styles["wine-item-card__label"]}>Rating</p>
        </div>
        <div
          className={`${styles["wine-item-card__card-body-col-1"]} ${styles["wine-item-card__card-body-rating-col"]}`}
        >
          <p className={styles["wine-item-card__rating-label"]}>Ine</p>
          <div className={styles["wine-item-card__rating-number"]}>
            <p
              className={`${styles["wine-info-text"]} ${styles["wine-info-text__rating_number"]}`}
            >
              {wine.ineRating}
            </p>
          </div>
        </div>
        <div
          className={`${styles["wine-item-card__card-body-col-2"]} ${styles["wine-item-card__card-body-rating-col"]}`}
        >
          <p className={styles["wine-item-card__rating-label"]}>Sander</p>
          <div className={styles["wine-item-card__rating-number"]}>
            <p
              className={`${styles["wine-info-text"]} ${styles["wine-info-text__rating_number"]}`}
            >
              {wine.sanderRating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineItemCard;
