import React from "react";
import { connect } from "react-redux";
import WineSearchFormComponent from "./wineform/WineSearchForm";
import WineListComponent from "./winelist/winelist";
import PropTypes from 'prop-types';
import "./winesearch.scss";

const WineSearchComponent = props => {
  const { wineItems } = props;
  return (
    <div>
      <WineSearchFormComponent />
      {wineItems && <WineListComponent items={wineItems} />}
    </div>
  );
};

WineSearchComponent.propTypes = {
  wineItems: [PropTypes.array, PropTypes.required]
}

function mapStateToProps(state) {
  return {
    wineItems: state.wineItems,
  };
}

export default connect(mapStateToProps)(WineSearchComponent);
