import React, { Component } from "react";
import "./App.scss";
import AddWineForm from "./components/add-wine/add-wine";
import logo from "./wine.png";
import SearchComponent from "./components/search/search";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Wine Rater</h2>
        </div>
        <div className="container">
          <AddWineForm />
        </div>
        <div>
          <SearchComponent />
        </div>
      </div>
    );
  }
}

export default App;
