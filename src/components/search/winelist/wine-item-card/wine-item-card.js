import React from "react";
import { Link } from "react-router-dom";
import * as images from "../../../../images";
import no_icon_red from "../../../../images/no_icon_red.png";
import "./wine-item-card.scss";

const wineMap = {
  RED: "RØD",
  WHITE: "HVIT",
  ROSÈ: "ROSÈ",
};

const WineItemCard = ({wine})=> {
  const image = wine.image_url ? wine.image_url: no_icon_red;
  return (
    <div className="wine-item">
      <div className="card bg-light">
        <div className="card-header">
          <h4>
            <Link to={"/wines/" + wine.id}>{wine.name}</Link>
          </h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 col-xs-12">
              <p className="wine-info-text">{wineMap[wine.type]}</p>
              <p className="wine-info-text">{wine.year}</p>
            </div>
            <div className="col-md-3 col-xs-12">
              <p className="wine-info-text">
                {wine.country+ wine.region}
              </p>
              <p className="wine-info-text">{wine.grapes}</p>
            </div>
            <div className="col-md-3 col-xs-12">
              <p className="wine-info-text">Ine: {wine.ineRating}</p>
              <p className="wine-info-text">Sander: {wine.sanderRating}</p>
            </div>
            <div className="col-md-3 col-xs-12">
              <img className="wine-image" alt="wine" src={image}></img>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
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
        </div>
      </div>
    </div>
  );
};

export default WineItemCard;
