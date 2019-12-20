import React from "react";
import { connect } from "react-redux";
import WineSearchFormComponent from "./wineform/WineSearchForm";
import WineListComponent from "./winelist/winelist";
import PropTypes from "prop-types";
import "./winesearch.scss";

// TODO CONSISTENT FILENAMING PLEASE.
const WineSearchComponent = props => {
  const { hasFetchedAllWines, wineItems } = props;
  return (
    <div>
      <WineSearchFormComponent />
      {wineItems.length ? (
        <WineListComponent items={wineItems} />
      ) : hasFetchedAllWines ? (
        <h3 className="wine-search__no-hits">Ingen viner matcher søket.</h3>
      ) : (
        <h3 className="wine-search__pending">Laster inn viner...</h3>
      )}
    </div>
  );
};

WineSearchComponent.propTypes = {
  wineItems: PropTypes.array
};

function mapStateToProps(state) {
  return {
    wineItems: state.wineItems,
    hasFetchedAllWines: state.hasFetchedAllWines
  };
}

export default connect(mapStateToProps)(WineSearchComponent);
