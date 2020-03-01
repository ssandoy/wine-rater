import React from "react";
import { connect } from "react-redux";
import WineSearchFormComponent from "./wineform/WineSearchForm";
import WineListComponent from "./winelist/winelist";
import PropTypes from "prop-types";
import "./winesearch.scss";
import Spinner from "../spinner/Spinner";

// TODO CONSISTENT FILENAMING PLEASE.
const WineSearchComponent = ({ hasFetchedAllWines, wineItems }) => {
  // FIXME WINEITEMS IS SET AND MUTATED IN CHILD COMPONENT... Better structure plz.
  return (
    <>
      <WineSearchFormComponent />
      {wineItems.length ? (
        <WineListComponent items={wineItems} />
      ) : hasFetchedAllWines ? (
        <h3 className="wine-search__no-hits">Ingen viner matcher søket.</h3>
      ) : (
        <div className="wine-search__pending-container">
          <h3 className="wine-search__pending">Laster inn viner</h3>
          <Spinner />
        </div>
      )}
    </>
  );
};

WineSearchComponent.propTypes = {
  wineItems: PropTypes.array,
  hasFetchedAllWines: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    wineItems: state.wineReducer.wineItems,
    hasFetchedAllWines: state.wineReducer.hasFetchedAllWines
  };
}

export default connect(mapStateToProps)(WineSearchComponent);
