import React from "react";
import WineItemCard from "components/search/winelist/wine-item-card/wine-item-card";
import "./Winelist.scss";
import Wine from "../../../models/wine";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

const WineListComponent = (props: any) => {
  const [sortValue, setSortValue] = React.useState("rating");
  const wineItems = props.items;

  const handleChange = event => {
    setSortValue(event.target.value);
  };

  const sortWines = (items: Wine[], sortKey: string) => {
    return items.sort(function(obj1: Wine, obj2: Wine) {
      switch (sortKey) {
        case "rating": {
          // FIXME THIS IS HACKY.
          return (
            +obj2.sanderRating +
            +obj2.ineRating -
            (+obj1.sanderRating + +obj1.ineRating)
          );
        }
        case "grape": {
          return obj1.wineGrapes && obj2.wineGrapes
            ? obj1.wineGrapes[0] >= obj2.wineGrapes[0]
              ? 1
              : -1
            : -1;
        }
        case "name": {
          return obj1.wineName >= obj2.wineName ? 1 : -1;
        }
        default: {
          return (
            obj1.sanderRating +
            obj1.ineRating -
            (obj2.sanderRating + obj2.ineRating)
          );
        }
      }
    });
  };

  return (
    <div className="wine-list__container">
      <div className="wine-list__hits-container">
        <p className="wine-list__hits-paragraph">
          FANT {wineItems.length} VINER I SØKET
        </p>
      </div>
      <div className="wine-list__filter-container">
        <label>Sorter etter</label>
        <RadioGroup
          aria-label="filter wines"
          name="filterWines"
          value={sortValue}
          onChange={handleChange}
          className="wine-list__radio-group"
        >
          <div className="wine-list__radio-group-children">
            <FormControlLabel
              value="rating"
              control={<Radio color="primary" />}
              label="Rating"
            />
            <FormControlLabel
              value="grape"
              control={<Radio color="primary" />}
              label="Drue"
            />
            <FormControlLabel
              value="name"
              control={<Radio color="primary" />}
              label="Navn"
            />
          </div>
        </RadioGroup>
      </div>
      <div className="wine-item-list">
        {sortWines(props.items, sortValue).map((wine: Wine) => (
          <WineItemCard key={wine.key} wine={wine} />
        ))}
      </div>
    </div>
  );
};

export default WineListComponent;
