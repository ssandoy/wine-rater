import React from "react";
import "./search-dropdown.scss";
import Select from "react-select";

const colourStyles = {
	option: (provided, state) => ({
		...provided,
		borderBottom: '1px dotted pink',
		color: state.isSelected ? '#98FB98' : '#023950',
	}),
	control: styles => ({ ...styles, backgroundColor: "#e8eeef" }),
	multiValue: (provided, state) => {
		const transition = 'opacity 300ms';

		return { ...provided, backgroundColor: '#add8e6', transition };
	}
};

export const SearchDropDown = ({ searchItems, placeholder, onClick }) => {
	return (
			<React.Fragment>
				<Select
						placeholder={placeholder}
						options={searchItems.map(item => ({
							label: item,
							value: item,
						}))}
						onChange={opt =>
								onClick(opt.map(opt => opt.value))
						}
						styles={colourStyles}
						isMulti
				/>
			</React.Fragment>
	);
};
