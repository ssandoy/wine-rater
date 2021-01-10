import { createSelector } from "reselect";

const wineSelector = state => state.wineReducer;

export const hasFetchedAllWines = createSelector(
  wineSelector,
  wines => wines.hasFetchedAllWines
);
export const filteredWines = createSelector(wineSelector, wines => wines.wineItems);

export const allWines = createSelector(wineSelector, wines => wines.allWines);
