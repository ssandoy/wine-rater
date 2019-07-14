import React, { Component } from "react";
import "./Winelist.scss";
import WineItem from "./wineitem/wineitem";

class WineListComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    // TODO: START HERE AND LIST FIREBASE DATA. Pass it down with items in top compontent.  
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

export default WineListComponent;
