import React, { Component } from "react";
import "./wineitem.scss";
import Wine from '../../models/wine'
import no_icon_red from '../../images/no_icon_red.png'
import no_icon_white from '../../images/no_icon_white.png'

// TODO: ADD LINK TO CARD OR NAME
// TODO: MIXINS FOR MOBILE.. 
class WineItem extends Component<Wine, {}> {

  render() {
    return (
      <div className="wine-item">
        <div className="card bg-light">

          <div className="card-header"><h4>{this.props.name}</h4></div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 col-xs-12"><p className="wine-info-text">{this.props.type}</p></div>
              <div className="col-md-4 col-xs-12"><p className="wine-info-text">{this.props.year}</p></div>
              {this.props.image_url ? <div className="wineImage"> IMAGE_URL HERE</div> :
                this.props.type === 'RED' ?
                  <div className="col-md-4 col-xs-12"><img className="wine-image" alt="" src={no_icon_red}></img></div> :
                  <div className="col-md-4 col-xs-12"><img className="wine-image" alt="" src={no_icon_white}></img></div>}
            </div>
            <div className="row second-card-row">
              <div className="col-md-4 col-xs-12">
                <p className="wine-info-text">Ratings</p>
                {this.props.ratings ?
                  <button type="submit" className="btn nav-btn-red">SIGN UP</button> : null}
              </div>
              <div className="col-md-4 col-xs-12">
                <p className="wine-info-text">Pairs to</p>
                {this.props.pairs_to ?
                  <button type="submit" className="btn nav-btn-red">SIGN UP</button> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WineItem;
