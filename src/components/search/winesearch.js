import React, { Component } from "react";
import {connect} from 'react-redux';
import "./winesearch.scss";
import { withFirebase } from "../../firebase";
import { compose } from 'recompose';
import WineFormComponent from './wineform/wineform'
import WineListComponent from './winelist/winelist'


class WineSearchComponent extends Component {


  render() {
    const { wineItems } = this.props;
    return (
      <div>
        <WineFormComponent/>
       {wineItems && <WineListComponent onSubmit={this.onSubmit} items={wineItems} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    wineItems: state.wineItems
  }
}


export default compose(withFirebase, connect(mapStateToProps))(WineSearchComponent);
