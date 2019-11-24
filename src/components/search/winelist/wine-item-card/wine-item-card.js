import React from "react";
import * as images from "images";
import no_icon_red from "images/no_icon_red.png";
import "./wine-item-card.scss";
import WineItemCardInfoTextItem from "./wine-item-card-info-text-item";

const wineMap = {
  RED: "RØD",
  WHITE: "HVIT",
  ROSÈ: "ROSÈ",
  SPARKLING: "Musserende"
};

const WineItemCard = ({ wine }) => {
  const image = wine.image_url ? wine.image_url : no_icon_red;
  return (
    <div className="wine-item">
      <div className="card wine-item-card bg-white">
        <div className="card-header">
          <p>{wine.name}</p>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <img className="wine-image" alt="wine" src={image}></img>
            </div>
            <div className="col-5 offset-1">
              <WineItemCardInfoTextItem
                label="Type"
                value={wineMap[wine.type]}
              />
              <WineItemCardInfoTextItem label="Årgang" value={wine.year} />
              <WineItemCardInfoTextItem label="Land" value={wine.country} />
              <WineItemCardInfoTextItem label="Region" value={wine.region} />
              <WineItemCardInfoTextItem
                label="Druer"
                value={wine.grapes && wine.grapes.join(", ")}
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
