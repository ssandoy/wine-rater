import React, { Component } from "react";
import "./Winelist.scss";
import WineItem from "../wineitem/wineitem";

class WineList extends Component {
  render() {
    return (
      <div>
        {this.props.items.map((item, index) => (
          // TODO: NOT ENTIRELY HAPPY WITH THIS SOLUTION. Fix when input is from firebase.
          <WineItem
            key={item.id}
            name={item.name}
            type={item.type}
            year={item.year}
          />
        ))}
      </div>
    );
  }
}

export default WineList;
