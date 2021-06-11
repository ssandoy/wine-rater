import React from "react";
import * as images from "images";
import noIconRed from "images/no_icon_red.png";
import Wine from "models/wine";
import "./wine-item-card.scss";
import WineItemCardInfoTextItem from "./wine-item-card-info-text-item";
import { formatAmount } from "../../../../utils/formatAmount";

interface WineItemCardProps {
  wine: Wine;
}

const WineItemCard: React.FunctionComponent<WineItemCardProps> = ({
  wine
}: WineItemCardProps) => {
  const image = wine.winePicture ? wine.winePicture : noIconRed;
  return (
    <div className="wine-item-card">
      <div className="wine-item-card__card-header">
        <p className="wine-item-card__header-paragraph">{wine.wineName}</p>
      </div>
      <div className="wine-item-card__card-body">
        <div className="wine-item-card__card-body-col-1 wine-item-card__card-body-row-1">
          <img className="wine-image" alt="wine" src={image}></img>
        </div>
        <div className="wine-item-card__card-body-col-2 wine-item-card__card-body-row-1">
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
        <div className="wine-item-card__card-body-wine-row">
          <p className="wine-item-card__label">Passer til</p>
        </div>
        <div className="wine-item-card__card-body-wine-row">
          {wine.fitsTo &&
            wine.fitsTo.map(item => {
              return (
                <img
                  key={images[item]}
                  className="fits-to-image"
                  src={images[item]}
                  alt="wine"
                />
              );
            })}
        </div>
        <div className="wine-item-card__card-body-line-row">
          <hr />
        </div>
        <div className="wine-item-card__card-body-wine-row">
          <p className="wine-item-card__label">Rating</p>
        </div>
        <div className="wine-item-card__card-body-col-1 wine-item-card__card-body-rating-col">
          <p className="wine-item-card__rating-label">Ine</p>
          <div className="wine-item-card__rating-number">
            <p className="wine-info-text wine-info-text__rating_number">
              {wine.ineRating}
            </p>
          </div>
        </div>
        <div className="wine-item-card__card-body-col-2 wine-item-card__card-body-rating-col">
          <p className="wine-item-card__rating-label">Sander</p>
          <div className="wine-item-card__rating-number">
            <p className="wine-info-text wine-info-text__rating_number">
              {wine.sanderRating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineItemCard;
