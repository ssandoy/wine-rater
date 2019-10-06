import React, { Component } from "react";
import { Link } from "react-router-dom";
import no_icon_red from "../../../../images/no_icon_red.png";
import "./wine-item-card.scss";
import * as images from "../../../../images";
// TODO: ADD LINK TO CARD OR NAME
// TODO: MIXINS FOR MOBILE..

const wineMap = {
  RED: "RØD",
  WHITE: "HVIT",
  ROSÈ: "ROSÈ",
};
class WineItemCard extends Component {
  render() {
    console.log(this.props.fitsTo);
    const image = this.props.image_url ? this.props.image_url : no_icon_red;
    return (
      <div className="wine-item">
        <div className="card bg-light">
          <div className="card-header">
            <h4>
              <Link to={"/wines/" + this.props.id}>{this.props.name}</Link>
            </h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 col-xs-12">
                <p className="wine-info-text">{wineMap[this.props.type]}</p>
                <p className="wine-info-text">{this.props.year}</p>
              </div>
              <div className="col-md-3 col-xs-12">
                <p className="wine-info-text">
                  {this.props.wineCountry + this.props.wineRegion}
                </p>
                <p className="wine-info-text">{this.props.wineGrape}</p>
              </div>
              <div className="col-md-3 col-xs-12">
                <p className="wine-info-text">Ine: {this.props.ineRating}</p>
                <p className="wine-info-text">
                  Sander: {this.props.sanderRating}
                </p>
              </div>
              <div className="col-md-3 col-xs-12">
                <img className="wine-image" alt="wine" src={image}></img>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                {this.props.fitsTo &&
                  this.props.fitsTo.map(item => {
                    return (
                      <img
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
  }
}

export default WineItemCard;
// TODO: PROPTYPES.
