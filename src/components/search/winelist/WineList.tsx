import React from "react";
import WineItemCard from "components/search/winelist/wine-item-card/wine-item-card";
import "./winelist.scss";
import Wine from "../../../models/wine";
import Spinner from "../../spinner/Spinner";
import { useAppContext } from "../../../context/AppContext";

const WineList = () => {
  const { filteredWines: wines, isFetchingWines } = useAppContext();

  // fixme isFetchimng..
  return (
    <div className="wine-list__container">
      {!isFetchingWines && !wines?.length && (
        <h3 className="wine-search__no-hits">Ingen viner matcher søket.</h3>
      )}
      {isFetchingWines && (
        <div className="wine-search__pending-container">
          <h3 className="wine-search__pending">Laster inn viner</h3>
          <Spinner />
        </div>
      )}
      {!isFetchingWines && (
        <div className="wine-list__hits-container">
          <p className="wine-list__hits-paragraph">
            FANT {wines.length} {wines.length === 1 ? "VIN" : "VINER"} I SØKET
          </p>
        </div>
      )}

      <div className="wine-item-list">
        {wines?.map((wine: Wine) => (
          <WineItemCard key={wine.key} wine={wine} />
        ))}
      </div>
    </div>
  );
};

export default WineList;
