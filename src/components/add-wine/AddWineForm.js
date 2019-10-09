import React, { useState } from "react";
import { connect } from "react-redux";
import apetirif from "../../images/apetirif.png";
import bull from "../../images/bull.png";
import cheese from "../../images/cheese.png";
import chicken from "../../images/chicken.png";
import crab from "../../images/crab.png";
import deer from "../../images/deer.svg";
import pasta from "../../images/pasta.png";
import pig from "../../images/pig.png";
import pizza from "../../images/pizza.png";
import "./styles.scss";
import * as dispatchers from "../../dispatchers";
import ImageCheckbox from "./image-checkbox/image-checkbox";
import { withFirebase } from "../../firebase/index";
import useForm from "./useForm"
// TODO: VALIDATOR


const AddWineForm = props => {
  // const [wineName, setWineName] = useState("");
  // const [wineType, setWineType] = useState("RED");
  // const [wineYear, setWineYear] = useState("2002");
  // const [wineRegion, setWineRegion] = useState("Bordeaux");
  // const [wineCountry, setWineCountry] = useState("Frankrike");
  // const [wineGrape, setWineGrape] = useState("Pinot Noir");
  // const [sanderRating, setSanderRating] = useState(6.0);
  // const [ineRating, setIneRating] = useState(5.0);
  const [fitsTo, setFitsTo] = useState([]);
 

  // TODO: CONSIDER SET INSTEAD WITH PUSH AND POP.
  const stateSchema = {
    wineName: {value: '', error: ''},
    wineType: {value: 'Red', error: ''},
    wineYear: {value: '2002', error: ''},
    wineCountry: {value: 'Bordeaux', error: ''},
    wineGrape: {value: 'Frankrike', error: ''},
    wineRegion: {value: 'Pinot Noir', error: ''},
    sanderRating: {value: '6.0', error: ''},
    ineRating: {value: '5.0', error: ''},
  }

  const validationSchema = {
    wineName: {
        required: true, 
        validator: {
                    regEx: /^[a-zA-Z\s]+$/,
                    error: 'Invalid Wine name'
                   }
            },
    wineType: {
      required: true, 
      
            },
    wineYear: {
        required: true, 
        validator: {
                    regEx: /^[0-9]{4}$/,
                    error: 'Invalid Wine year'
                   }
            },
    wineCountry: {
        required: true, 
        validator: {
                    regEx: /^[a-zA-Z\s]+$/,
                    error: 'Invalid Wine country'
                   }
            },
    wineGrape: {
        required: true, 
        validator: {
                    regEx: /^[a-zA-Z\s]+$/,
                    error: 'Invalid Wine grape'
                   }
            },
    wineRegion: {
        required: true, 
        validator: {
                    regEx: /^[a-zA-Z\s]+$/,
                    error: 'Invalid Wine region'
                   }
            },
    sanderRating: {
        required: true, 
        validator: {
                    regEx: /^([0-9]|10)$/,
                    error: 'Invalid Wine rating'
                   }
            },
    ineRating: {
        required: true, 
        validator: {
                    regEx: /^([0-9]|10)$/,
                    error: 'Invalid Wine name'
                   }
            }
  }


  const handleCheckBoxChange = event => {
    let fitsToArray = [...fitsTo];
    if (fitsToArray.includes(event.target.value)) {
      const index = fitsToArray.findIndex(
        value => value === event.target.value
      );
      fitsToArray.splice(index, 1);
    } else {
      fitsToArray.push(event.target.value);
    }
    setFitsTo(fitsToArray);
  };

  function onSubmitForm(state){
      props.addWineToWineList(
        {
          wineName: state.wineName.value,
          wineType: state.wineType.value,
          wineYear: state.wineYear.value,
          wineCountry: state.wineCountry.value,
          wineGrape: state.wineGrape.value,
          wineRegion: state.wineRegion.value,
          sanderRating: state.sanderRating.value,
          ineRating: state.ineRating.value,
          fitsTo,
        },
        props.firebase
      );
      console.log(JSON.stringify(state,null,2));
  }

  const {state, handleOnChange, handleOnSubmit, disable} = useForm(stateSchema, validationSchema,onSubmitForm);
  // const onSubmit = event => {

  //   event.preventDefault();

  //   props.addWineToWineList(
  //     {
  //       wineName,
  //       wineType,
  //       wineYear,
  //       wineCountry,
  //       wineGrape,
  //       wineRegion,
  //       sanderRating,
  //       ineRating,
  //       fitsTo,
  //     },
  //     props.firebase
  //   );
  // };

  return (
    <div>
      <form onSubmit={handleOnSubmit} className="wine-form">
        <div className="row">
          <div className="form-group col-sm-10 col-md-8">
            <label htmlFor="wineName">Navn</label>
            <input
              type="text"
              name="wineName"
              className="form-control"
              value={state.wineName.value}
              onChange={handleOnChange}
            />
            {state.wineName.error && <p className="error">{state.wineName.error}</p>}
          </div>
          
          <div className="form-group col-sm-10 col-md-4">
            <label htmlFor="wineType">Type</label>
            <select
              className="custom-select"
              name="wineType"
              onChange={handleOnChange}
            >
              <option value="RED">Rød</option>
              <option value="WHITE">Hvit</option>
              <option value="ROSÉ">Rosé</option>
              <option value="SPARKLING">Musserende</option>
            </select>
          </div>
         
        </div>
        <div className="row">
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="wineYear">År</label>
            <input
              pattern="[0-9]{4}"
              title="Year"
              className="form-control"
              name="wineYear"
              value={state.wineYear.value}
              onChange={handleOnChange}
            />
            {state.wineYear.error && <p className="error">{state.wineYear.error}</p>}
          </div>
        
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="wineCountry">Land</label>
            <input
              title="Wine country"
              className="form-control"
              name="wineCountry"
              value={state.wineCountry.value}
              onChange={handleOnChange}
            />
           {state.wineCountry.error && <p className="error">{state.wineCountry.error}</p>}
          </div>
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="wineRegion">Region</label>
            <input
              title="Wine region"
              className="form-control"
              name="wineRegion"
              value={state.wineRegion.value}
              onChange={handleOnChange}
            />
          {state.wineRegion.error && <p className="error">{state.wineRegion.error}</p>}
          </div>
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="wineGrape">Drue</label>
            <input
              title="Wine grape"
              className="form-control"
              name="wineGrape"
              value={state.wineGrape.value}
              onChange={handleOnChange}
            />
          {state.wineGrape.error && <p className="error">{state.wineGrape.error}</p>}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="sanderRating">Rating Sander</label>
            <input
              pattern="[0-9]"
              title="Rating"
              className="form-control"
              name="sanderRating"
              value={state.sanderRating.value}
              onChange={handleOnChange}
            />
            {state.sanderRating.error && <p className="error">{state.sanderRating.error}</p>}
          </div>
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="ineRating">Rating Ine</label>
            <input
              pattern="[0-9]"
              title="Rating"
              className="form-control"
              name="ineRating"
              value={state.ineRating.value}
              onChange={handleOnChange}
            />
          {state.ineRating.error && <p className="error">{state.ineRating.error}</p>}
          </div>
        </div>
        <div className="form-group">
          <label>Passer til</label>
          <div className="row fits-to-row">
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={chicken}
              htmlFor="chicken"
              value="chicken"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={crab}
              htmlFor="seafood"
              value="seafood"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={pasta}
              htmlFor="pasta"
              value="pasta"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={pizza}
              htmlFor="pizza"
              value="pizza"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={apetirif}
              htmlFor="apetirif"
              value="apetirif"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={deer}
              htmlFor="deer"
              value="deer"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={bull}
              htmlFor="bull"
              value="bull"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={pig}
              htmlFor="pig"
              value="pig"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={cheese}
              htmlFor="cheese"
              value="cheese"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
          </div>
        </div>
        <button type="submit" className="add-wine-button btn btn-primary" disabled={disable}>
          Registrer vin
        </button>
       
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  wineItems: state.wineItems,
});

export default withFirebase(
  connect(
    mapStateToProps,
    {
      addWineToWineList: dispatchers.addWineToWineList,
    }
  )(AddWineForm)
);

// TODO: ADD VALIDATION FOR NUMBERS ETC.
// TODO: UPDATE WINEITEM-DATA IN PARENT
// TODO: ADD ALT-PROP TO IMAGES.
// TODO: ADD IMAGEUPLOADER.
