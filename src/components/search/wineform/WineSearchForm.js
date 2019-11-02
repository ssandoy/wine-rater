import React, { useState } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as dispatchers from "../../../dispatchers";
import { SearchDropDown } from "../../../components/add-wine/search-dropdown/search-dropdown";
import { Raastoff } from "../../../data/raastoff";
// FIXME: RELATIVE IMPORTS INSTEAD.

const WineSearchFormComponent = props => {
	const [wineName, setWineName] = useState(null);
	const [wineType, setWineType] = useState(null);
	const [wineFromYear, setWineFromYear] = useState(null);
	const [wineToYear, setWineToYear] = useState(null);
	const [fitsTo, setFitsTo] = useState([]);
	const [selectedWineGrapes, setSelectedWineGrapes] = useState([]);
	const [selectedCountries, setSelectedCountries] = useState([]);
	const [selectedRegions, setSelectedRegions] = useState([]);
	const [selectedFitsTo, setSelectedFitsTo] = useState([]);


	const wineGrapeItems = Raastoff.values.map(value => value.code);

	const onSubmit = event => {
		event.preventDefault();
		props.setWines(props.allWines);
	};


	const onClear = event => {
		event.preventDefault();
		props.clearWines();
	};

	return (
		<div className="wine-form">
			<form onSubmit={e => onSubmit(e)}>
				<div className="form-group">
					<div className="row">
						<div className="col-6">
							<label htmlFor="wineName">Søk på navn</label>
							<input
								type="text"
								name="wineName"
								className="form-control"
								value={wineName}
								onChange={e => setWineName(e.target.value)}
							/>
						</div>
						<div className="col-6">
							<label htmlFor="wineType">Filtrer på type</label>
							<select
								className="custom-select custom-select-xl-1 mb-1"
								name="wineType"
								onChange={e => setWineType(e.target.value)}
							>
								<option value="RED">Rød</option>
								<option value="WHITE">Hvit</option>
								<option value="ROSÉ">Rosé</option>
								<option value="SPARKLING">Musserende</option>
							</select>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="wineYearLabel">
						<label htmlFor="wineYear">Filtrer på årstall</label>
					</div>
					<div className="row">
						<div className="col-6">
							<input
								type="number"
								name="quantity"
								min="1980"
								max="2021"
								title="fromYear"
								className="form-control"
								placeholder="Fra"
								value={wineFromYear}
								onChange={e => setWineFromYear(e.target.value)}
							/>
						</div>
						<div className="col-6">
							<input
								type="number"
								name="quantity"
								min="1980"
								max="2021"
								title="toYear"
								className="form-control"
								placeholder="Til"
								value={wineToYear}
								onChange={e => setWineToYear(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="row">
						<div className="col-6">
							<label htmlFor="fitsTo">Hva passer vinen til?</label>
							<SearchDropDown
								placeholder="Type rett"
								searchItems={[...new Set(props.allWines.flatMap(wine => wine.fitsTo))]}
								selectedItems={selectedFitsTo}
								onClick={fitsToArray => {
									//TODO CONSIDER static fitsToArray instead of allWines.fitsTo...
									setSelectedFitsTo(fitsToArray);
								}}
							/>
						</div>
						<div className="col-6">
							<label>Filtrer på drue</label>
							<SearchDropDown
								placeholder="Velg vindrue"
								searchItems={wineGrapeItems}
								onClick={grapeArray => setSelectedWineGrapes(grapeArray)}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="row">
						<div className="col-6">
							<label htmlFor="fitsTo">Land</label>
							<SearchDropDown
								placeholder="Land"
								searchItems={[...new Set(props.allWines.map(wine => wine.wineCountry))]}
								selectedItems={selectedCountries}
								onClick={countryArray => setSelectedCountries(countryArray)}
							/>
						</div>
						<div className="col-6">
							<label>Region</label>
							<SearchDropDown //TODO: MULTISELECT FOR THESE.
								placeholder="Region"
								searchItems={[...new Set(props.allWines.map(wine => wine.wineRegion)
									.filter(region => region !== null))]}
								onClick={regionArray => setSelectedRegions(regionArray)}
							/>
						</div>
					</div>
				</div>
				<button type="submit" className="addWineButton btn btn-primary">
					List wines
				</button>
				<button
					type="submit"
					onClick={e => onClear(e)}
					className="addWineButton btn btn-danger"
				>
					Clear search
				</button>
			</form>
		</div>
	);
};

WineSearchFormComponent.propTypes = {
	setWines: PropTypes.func,
	setAllWines: PropTypes.func,
	handleCheckBoxChange: PropTypes.func,
	clearWines: PropTypes.func,
	firebase: PropTypes.isRequired,
	allWines: PropTypes.array,
};


const mapStateToProps = state => ({
	wineItems: state.wineItems,
	allWines: state.allWines,
});

export default connect(
	mapStateToProps,
	{
		setAllWines: dispatchers.setAllWines,
		setWines: dispatchers.setWines,
		clearWines: dispatchers.clearWines,
	}
)(WineSearchFormComponent);
