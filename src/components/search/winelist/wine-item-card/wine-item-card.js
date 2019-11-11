import React from "react";
import * as images from "images";
import no_icon_red from "images/no_icon_red.png";
import "./wine-item-card.scss";

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
      <div className="card bg-white">
        <div className="card-header">
          <h5>{wine.name}</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <img className="wine-image" alt="wine" src={image}></img>
            </div>
            <div className="col-6">
              <p className="card-label">Type</p>
              <p className="wine-info-text">{wineMap[wine.type]}</p>
              <p className="card-label">Årgang</p>
              <p className="wine-info-text">{wine.year}</p>
              <p className="card-label">Land</p>
              <p className="wine-info-text">{wine.country}</p>
              <p className="card-label">Region</p>
              <p className="wine-info-text">{wine.region}</p>
              <p className="card-label">Druer</p>
              <p className="wine-info-text">Nebbiolo, Sangiovese</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-12 wine-row">
              <p className="centered-label">Passer til</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-12 wine-row">
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
            <div className="col-md-3 col-sm-12 wine-row">
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
