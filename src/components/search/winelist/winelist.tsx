import React from "react";
import WineItemCard from "components/search/winelist/wine-item-card/wine-item-card";
import "./Winelist.scss";
import Wine from "../../../models/wine";

const WineListComponent = (props: any) => {
  const wineItems = props.items;
  return (
    <div className="wine-list__container">
      <div className="wine-list__hits-container">
        <p className="wine-list__hits-paragraph">{wineItems.length} TREFF PÅ VINER</p>
      </div>
      <div className="wine-item-list">
        {props.items.map((wine: Wine) => (
          <WineItemCard key={wine.key} wine={wine} />
        ))}
      </div>
    </div>
  );
};

export default WineListComponent;
