import React from "react";
import * as images from "images";
import no_icon_red from "images/no_icon_red.png";
import Wine from "models/wine";
import "./wine-item-card.scss";
import WineItemCardInfoTextItem from "./wine-item-card-info-text-item";

interface WineItemCardProps {
  wine: Wine;
}

const WineItemCard = ({ wine }: WineItemCardProps) => {
  const image = wine.winePicture ? wine.winePicture : no_icon_red;
  return (
    <div className="wine-item">
      <div className="wine-item-card">
        <div className="wine-item-card__card-header">
          <p className="wine-item-card__header-paragraph">{wine.wineName}</p>
        </div>
        <div className="wine-item-card__card-body">
          <div className="row">
            <div className="col-6">
              <img className="wine-image" alt="wine" src={image}></img>
            </div>
            <div className="col-5 offset-1">
              <WineItemCardInfoTextItem label="Type" value={wine.wineType} />
              <WineItemCardInfoTextItem label="Årgang" value={wine.wineYear} />
              <WineItemCardInfoTextItem label="Land" value={wine.wineCountry} />
              <WineItemCardInfoTextItem
                label="Region"
                value={wine.wineRegion}
              />
              <WineItemCardInfoTextItem
                label="Druer"
                value={wine.wineGrapes && wine.wineGrapes.join(", ")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 wine-row">
              <p className="centered-label">Passer til</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 wine-row">
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
          </div>
          <hr />
          <div className="row">
            <div className="col-12 wine-row wine-row__no-margin-top">
              <p className="centered-label">Rating</p>
            </div>
            <div className="col-6 wine-item-card__rating-col">
              <p className="wine-item-card__rating-label">Ine</p>
              <div className="wine-item-card__rating-number">
                <p className="wine-info-text">{wine.ineRating}</p>
              </div>
            </div>
            <div className="col-6 wine-item-card__rating-col">
              <p className="wine-item-card__rating-label">Sander</p>
              <div className="wine-item-card__rating-number">
                <p className="wine-info-text">{wine.sanderRating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineItemCard;
