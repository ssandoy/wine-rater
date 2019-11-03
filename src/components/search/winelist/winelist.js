import React from "react";
import WineItemCard from "./wine-item-card/wine-item-card";
import "./Winelist.scss";

const WineListComponent = props => {
  return (
    <div>
      {props.items.map(wine => (
        <WineItemCard
          key={wine.key}
          wine={wine}
        />
      ))}
    </div>
  );
};

export default WineListComponent;
