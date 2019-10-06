import React, { Component } from "react";

import "./mainpage.scss";
import AddWineForm from "../add-wine/AddWineForm";
import WineSearchComponent from "../search/winesearch";

class MainPageComponent extends Component {
  render() {
    return (
      <div className="container">
        <AddWineForm />
        <div className="searchComponent">
          <WineSearchComponent />
        </div>
      </div>
    );
  }
}

export default MainPageComponent;
