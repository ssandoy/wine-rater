import React from "react";
import { connect } from "react-redux";
import WineSearchFormComponent from "./wineform/WineSearchForm";
import WineListComponent from "./winelist/winelist";
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

function mapStateToProps(state) {
  return {
    wineItems: state.wineItems,
  };
}

export default connect(mapStateToProps)(WineSearchComponent);
