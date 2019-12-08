import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import MainPageComponent from "./components/main-page/mainpage";
import NotFoundComponent from "./components/notfound/notfound";
import WineDetailsComponent from "./components/wine-details/winedetails";
import logo from "./logo.png";

const App = () => {
  document.title = "Vinolini";
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <Switch>
          <Route exact path={["/wines", "/"]} component={MainPageComponent} />
          <Route path="/wines/:id" component={WineDetailsComponent} />.
          <Route component={NotFoundComponent} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
