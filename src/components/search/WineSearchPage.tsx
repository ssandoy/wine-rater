import React from "react";
import { WineFilterProvider } from "../../context/filter-context/WineFilterContext";
import WineSearch from "./WineSearch";

export const WineSearchPage = () => {
  return (
    <WineFilterProvider>
      <WineSearch />
    </WineFilterProvider>
  );
};
