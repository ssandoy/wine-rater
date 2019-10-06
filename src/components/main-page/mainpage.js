import React, { Component } from "react";

import "./mainpage.scss";
import AddWineForm from "../add-wine/AddWineForm";
import WineSearchComponent from "../search/winesearch";

const MainPageComponent = props => {
  return (
    <div className="container">
      <AddWineForm />
      <div className="searchComponent">
        <WineSearchComponent />
      </div>
    </div>
  );
};

export default MainPageComponent;
