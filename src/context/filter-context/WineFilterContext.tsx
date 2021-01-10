// src/count-context.js
import React, { useMemo, useState } from "react";

type FilterValue<T> = {
  value: T;
  setValue: (val: T) => void;
};
export type WineType = "Rødvin" | "Hvitvin" | "alle";

type State = {
  hasOpenedFilter: boolean;
  setHasOpenedFilter: (hasOpenedFilter: boolean) => void;
  filters: {
    wineName: FilterValue<string>;
    selectedWineGrapes: FilterValue<string[]>;
    selectedCountries: FilterValue<string[]>;
    selectedRegions: FilterValue<string[]>;
    selectedFitsTo: FilterValue<string[]>;
    wineType: FilterValue<WineType>;
  };
};

export const WineFilterContext = React.createContext<State | undefined>(
  undefined
);

const WineFilterProvider = props => {
  const [hasOpenedFilter, setHasOpenedFilter] = useState(false);
  const [wineType, setWineType] = useState<WineType>("alle");
  const [wineName, setWineName] = useState<string>("");
  const [selectedWineGrapes, setSelectedWineGrapes] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedFitsTo, setSelectedFitsTo] = useState<string[]>([]);
  const value = useMemo(() => {
    const val: State = {
      hasOpenedFilter,
      setHasOpenedFilter,
      filters: {
        wineName: {
          value: wineName,
          setValue: setWineName
        },
        wineType: {
          value: wineType,
          setValue: setWineType
        },
        selectedWineGrapes: {
          value: selectedWineGrapes,
          setValue: setSelectedWineGrapes
        },
        selectedCountries: {
          value: selectedCountries,
          setValue: setSelectedCountries
        },
        selectedFitsTo: {
          value: selectedFitsTo,
          setValue: setSelectedFitsTo
        },
        selectedRegions: {
          value: selectedRegions,
          setValue: setSelectedRegions
        }
      }
    };
    return val;
  }, [
    hasOpenedFilter,
    wineName,
    wineType,
    selectedWineGrapes,
    selectedCountries,
    selectedFitsTo,
    selectedRegions
  ]);
  return <WineFilterContext.Provider value={value} {...props} />;
};

const useWineFilterContext = () => {
  const context = React.useContext(WineFilterContext);
  if (!context) {
    throw new Error(`useFilterContext must be used within a FilterProvider`);
  }
  return context;
};

export { WineFilterProvider, useWineFilterContext };
