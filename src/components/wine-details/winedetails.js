import React, { Component } from "react";

import {withFirebase} from '../../firebase/index'

class WineDetailsComponent extends Component {

  constructor(props) {
      super(props);
      console.log(this.props.match)
      
  }


  render() {
    return(
      <div className="wineDetails">
        <div className="row">
          <h1>DETAILS</h1>
        </div>
      </div>
    );
  }
}


export default withFirebase(WineDetailsComponent);