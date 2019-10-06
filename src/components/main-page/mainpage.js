import React from "react";
import AddWineForm from "../add-wine/AddWineForm";
import WineSearchComponent from "../search/winesearch";
import "./mainpage.scss";

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
