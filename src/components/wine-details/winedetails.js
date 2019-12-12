import React, { useEffect } from "react";

import { withFirebase } from "firebase/index";

const WineDetailsComponent = props => {
  useEffect(() => {
    return () => {
      this.props.firebase.wine(this.props.match.params.id);
    };
  }, []);

  return (
    <div className="wineDetails">
      <div className="row">
        <h1>DETAILS</h1>
      </div>
    </div>
  );
};

export default withFirebase(WineDetailsComponent);
