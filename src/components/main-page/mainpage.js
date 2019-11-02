import React, { useEffect } from "react";
import AddWineForm from "../add-wine/AddWineForm";
import WineSearchComponent from "../search/winesearch";
import "./mainpage.scss";
import * as dispatchers from "../../dispatchers";
import { withFirebase } from "../../firebase";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const MainPageComponent = props => {

	useEffect(() => {
		props.firebase.database
			.ref("wines")
			.once("value")
			.then(wineItemsSnapshot => {
				props.setAllWines(props.firebase.snapshotToArray(wineItemsSnapshot));
			});
	}, []);

	return (
		<div className="container">
			<AddWineForm/>
			<div className="searchComponent">
				<WineSearchComponent/>
			</div>
		</div>
	);
};

MainPageComponent.propTypes = {
	allWines: PropTypes.array,
	setAllWines: PropTypes.func,
	firebase: PropTypes.isRequired,
};

const mapStateToProps = state => ({
	allWines: state.allWines,
});

export default withFirebase(
	connect(
		mapStateToProps,
		{
			setAllWines: dispatchers.setAllWines,
		}
	)(MainPageComponent));
