import React, { Component } from "react";
import "./App.scss";
import WineList from "./components/winelist/Winelist";
import AddWineForm from './components/add-wine/add-wine'
import logo from "./wine.png";

const wines = { 
  "wines": 
  [ 
    {
      id: "1",
      name:"Barolo", 
      type: "RED",
      year:"2018"
    }, 
    {
      id: "2",
      type: "RED",
      name:"Barbaresco", 
      year:"2015"
    }
  ]

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Wine Rater</h2>
        </div>
        <AddWineForm ></AddWineForm>
        <WineList
          items={wines["wines"]}
        />
      </div>
    );
  }
}


// TODO: PASS DATA FROM ADDWINE-FORM TO HERE. IS THAT NEEDED? RE: FIREBASE...
function handleClick() {
  alert('Wine added');
}
//onClick={() => handleClick()}

export default App;
