import React from "react";
import WineItemCard from "./wine-item-card/wine-item-card";
import "./Winelist.scss";

const WineListComponent = props => {
  // TODO: SORT BY VALUE FROM SELECT. SO MUCH STATE
  const onChange = p => p;

  return (
    <div>
      {props.items.map((item, index) => (
        <WineItemCard
          key={item.key}
          id={item.key}
          name={item.wineName}
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
};

export default WineListComponent;
