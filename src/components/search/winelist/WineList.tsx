import React from "react";
import WineItemCard from "components/search/winelist/wine-item-card/wine-item-card";
import "./winelist.scss";
import Wine from "../../../models/wine";
import {
  filteredWines,
  hasFetchedAllWines
} from "../../../selectors/wine-selectors";
import { useSelector } from "react-redux";
import Spinner from "../../spinner/Spinner";

const WineList = () => {
  const wines = useSelector(filteredWines);
  const hasFetchedWines = useSelector(hasFetchedAllWines);

  return (
    <div className="wine-list__container">
      {hasFetchedWines && !wines?.length && (
        <h3 className="wine-search__no-hits">Ingen viner matcher søket.</h3>
      )}
      {!hasFetchedWines && (
        <div className="wine-search__pending-container">
          <h3 className="wine-search__pending">Laster inn viner</h3>
          <Spinner />
        </div>
      )}
      <div className="wine-list__hits-container">
        <p className="wine-list__hits-paragraph">
          FANT {wines.length} {wines.length === 1 ? "VIN" : "VINER"} I SØKET
        </p>
      </div>

      <div className="wine-item-list">
        {wines.map((wine: Wine) => (
          <WineItemCard key={wine.key} wine={wine} />
        ))}
      </div>
    </div>
  );
};

export default WineList;
