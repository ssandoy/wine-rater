import React, { Component } from "react";
import "./Winelist.scss";
import WineItem from "./wineitem/wineitem";

class WineListComponent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  // TODO: SORT BY VALUE FROM SELECT. SO MUCH STATE
  onChange() {
  }

  render() {
    return (
      <div>
        <div className="selectSort">
          <select
            className="custom-select"
            name="wineType"
            onChange={this.onChange}
          >
            <option value="">Name</option>
            <option value="WHITE">Type</option>
            <option value="ROSÉ">Year</option>
          </select>
        </div>
        {this.props.items.map((item, index) => (
          // TODO: NOT ENTIRELY HAPPY WITH THIS SOLUTION. Fix when input is from firebase.
          <WineItem
            key={item.key}
            id={item.key}
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
