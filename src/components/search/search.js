import React, { Component } from "react";
import "./search.scss";
import { withFirebase } from "../../firebase";
import WineSearchComponent from './winesearch/winesearch'
import WineListComponent from './winelist/Winelist'

const INITIAL_STATE = {
  wineItems: []
};

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleWineSearch = this.handleWineSearch.bind(this);
  }


  handleWineSearch(wineItems) {
    this.setState({
      wineItems: wineItems ? wineItems : []
    });
  }

  render() {
      return(
        <div>
          <WineSearchComponent onClick={this.handleWineSearch}></WineSearchComponent>
          <WineListComponent items={this.state['wineItems']}></WineListComponent>
        </div>
      );
  };
}


export default SearchComponent;