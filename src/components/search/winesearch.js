import React from "react";
import { connect } from "react-redux";
import WineSearchFormComponent from "./wineform/WineSearchForm";
import WineListComponent from "./winelist/winelist";
import PropTypes from "prop-types";
import "./winesearch.scss";

// TODO CONSISTENT FILENAMING PLEASE.
const WineSearchComponent = props => {
  const { wineItems, hasSearched } = props;
  return (
    <div>
      <WineSearchFormComponent />
      {hasSearched ? (
        wineItems.length ? (
          <WineListComponent items={wineItems} />
        ) : (
          <h3 className="wine-search__no-hits">Ingen viner matcher søket.</h3>
        )
      ) : null}
    </div>
  );
};

WineSearchComponent.propTypes = {
  hasSearched: PropTypes.bool,
  wineItems: PropTypes.array
};

function mapStateToProps(state) {
  return {
    wineItems: state.wineItems,
    hasSearched: state.hasSearched
  };
}

export default connect(mapStateToProps)(WineSearchComponent);
