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
      <div className="card wine-item-card bg-white">
        <div className="card-header">
          <p>{wine.wineName}</p>
        </div>
        <div className="card-body">
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
            <div className="col-sm-12 wine-row">
              <p className="centered-label">Passer til</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 wine-row">
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
            <div className="col-sm-12 wine-row">
              <p className="">Ine</p>
              <p className="wine-info-text">{wine.ineRating}</p>
              <p className="">Sander</p>
              <p className="wine-info-text">{wine.sanderRating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineItemCard;
