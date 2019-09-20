import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";
import logo from "./wine.png";

import NotFoundComponent from "./components/notfound/notfound";
import MainPageComponent from "./components/main-page/mainpage";
import WineDetailsComponent from "./components/wine-details/winedetails";

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Wine Rater</h2>
            </div>
          </div>
          <Switch>
            <Route exact path={["/wines", "/"]} component={MainPageComponent} />
            <Route path="/wines/:id" component={WineDetailsComponent} />.
            <Route component={NotFoundComponent} />
          </Switch>
        </Router>
    );
  }
}

export default App;
