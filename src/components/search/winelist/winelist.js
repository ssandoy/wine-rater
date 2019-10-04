import React, { Component } from "react";
import "./Winelist.scss";
import WineItemCard from "./wine-item-card/wine-item-card";

class WineListComponent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  // TODO: SORT BY VALUE FROM SELECT. SO MUCH STATE
  onChange() {}

  render() {
    return (
      <div>
        {this.props.items.map((item, index) => (
          <WineItemCard
            key={item.key}
            id={item.key}
            name={item.name}
            type={item.type}
            year={item.year}
            ineRating={item.ineRating}
            sanderRating={item.sanderRating}
            wineGrape={item.wineGrape}
            wineRegion={item.wineRegion}
            wineCountry={item.wineCountry}
            fitsTo={item.fitsTo}
          />
        ))}
      </div>
    );
  }
}

export default WineListComponent;
