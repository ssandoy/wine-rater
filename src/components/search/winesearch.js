import React, { Component } from "react";
import { connect } from "react-redux";
import WineFormComponent from "./wineform/wineform";
import WineListComponent from "./winelist/winelist";
import "./winesearch.scss";

const WineSearchComponent = props => {
  const { wineItems } = props;
  return (
    <div>
      <WineFormComponent />
      {wineItems && <WineListComponent items={wineItems} />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    wineItems: state.wineItems,
  };
}

export default connect(mapStateToProps)(WineSearchComponent);
