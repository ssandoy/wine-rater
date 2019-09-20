import React, { Component } from "react";

import {withFirebase} from '../../firebase/index'

class WineDetailsComponent extends Component {

  constructor(props) {
      super(props);
      console.log(this.props.match.params.id);
      console.log(this.props.firebase.wine(this.props.match.params.id));
  }


 componentDidMount() {
    try {
      const data = this.props.firebase.wine(this.props.match.params.id);
      console.log(data);
    } catch (e) {

    }
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