import React, { useEffect } from "react";
import AddWineForm from "components/add-wine/AddWineForm";
import WineSearchComponent from "components/search/winesearch";
import "./mainpage.scss";
import * as dispatchers from "dispatchers";
import { withFirebase } from "firebase/index";
import Wine from "models/wine";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const MainPageComponent = (props: any) => {
  useEffect(() => {
    props.firebase.database
      .ref("wines")
      .once("value")
      .then((wineItemsSnapshot: any) => {
        props.setAllWines(
          props.firebase
            .snapshotToArray(wineItemsSnapshot)
            .map((item: Wine) => item)
        );
      });
  }, [props]);

  return (
    <div className="container">
      <AddWineForm />
      <div className="searchComponent">
        <WineSearchComponent />
      </div>
    </div>
  );
};

MainPageComponent.propTypes = {
  allWines: PropTypes.array,
  setAllWines: PropTypes.func,
  firebase: PropTypes.object
};

const mapStateToProps = (state: any) => ({
  allWines: state.allWines
});

export default withFirebase(
  connect(
    mapStateToProps,
    {
      setAllWines: dispatchers.setAllWines
    }
  )(MainPageComponent)
);
