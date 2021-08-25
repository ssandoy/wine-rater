import React from "react";
import WineItemCard from "components/search/winelist/wine-item-card/wine-item-card";
import "./winelist.scss";
import Wine from "../../../models/wine";
import { useAppContext } from "../../../context/AppContext";
import { WineItemCardSkeleton } from "./wine-item-card-skeleton";

const WineList = () => {
  const { filteredWines: wines, isFetchingWines } = useAppContext();

  return (
    <div className="wine-list__container">
      {!isFetchingWines && !wines?.length && (
        <h3 className="wine-search__no-hits">Ingen viner matcher søket.</h3>
      )}
      {!isFetchingWines ? (
        <>
          <div className="wine-list__hits-container">
            <p className="wine-list__hits-paragraph">
              FANT {wines.length} {wines.length === 1 ? "VIN" : "VINER"} I SØKET
            </p>
          </div>
          <div className="wine-item-list">
            {wines?.map((wine: Wine) => (
              <WineItemCard key={wine.key} wine={wine} />
            ))}
          </div>
        </>
      ) : (
        <div className="wine-list__hits-container">
          <p className="wine-list__hits-paragraph">LASTER...</p>
        </div>
      )}
      {isFetchingWines && (
        <div className="wine-list__hits-container">
          <div className="wine-item-list">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(val => {
              return <WineItemCardSkeleton key={val} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WineList;
