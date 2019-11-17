import React from "react";
import WineItemCard from "./wine-item-card/wine-item-card";
import "./Winelist.scss";

const WineListComponent = props => {
  return (
    <div className="wine-item-list">
      {props.items.map(wine => (
        <WineItemCard key={wine.id} wine={wine} />
      ))}
    </div>
  );
};

export default WineListComponent;
