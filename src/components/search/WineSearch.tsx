import type React from "react";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import FilterIcon from "../../icons/FilterIcon";
import { filterWines, type WineTypeFilter } from "../../utils/wine-filters";
import { ActiveFilters } from "./active-filters/ActiveFilters";
import { getActiveFilterChips } from "./active-filters/activeFilterChips";
import { useWineFilters } from "./useWineFilters";
import { WineNameSearch } from "./WineNameSearch";
import WineFilterForm from "./wine-filter-form/WineFilterForm";
import WineList from "./winelist/WineList";
import winelistStyles from "./winelist/winelist.module.css";
import styles from "./winesearch.module.css";

const FILTER_PANEL_ID = "wine-filter-panel";

const WINE_TYPE_OPTIONS: Array<{
  label: string;
  value: WineTypeFilter | "alle";
}> = [
  { label: "Alle", value: "alle" },
  { label: "Rød", value: "rod" },
  { label: "Hvit", value: "hvit" },
];

const WineSearch = () => {
  const { allWines } = useAppContext();
  const { filters, updateFilters, clearFilters } = useWineFilters();
  const [hasOpenedFilter, setHasOpenedFilter] = useState(false);
  const closeFilter = () => setHasOpenedFilter(false);

  const wines = filterWines(allWines, filters);
  const chips = getActiveFilterChips(filters);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as WineTypeFilter | "alle";
    updateFilters({ type: value === "alle" ? undefined : value });
  };

  return (
    <div className={styles["wine-search__container"]}>
      <div className={styles["wine-search__filter-bar"]}>
        <h1 className={`page-title ${styles["wine-search__title"]}`}>
          Lagrede viner
        </h1>
        <button
          type="button"
          className={styles["wine-search__filter-icon"]}
          onClick={() => setHasOpenedFilter(!hasOpenedFilter)}
          aria-expanded={hasOpenedFilter}
          aria-controls={FILTER_PANEL_ID}
        >
          <FilterIcon height="30" width="30" />
          <p className={styles["wine-search__paragraph"]}>
            Filter{chips.length > 0 && ` (${chips.length})`}
          </p>
        </button>
      </div>
      <div className={winelistStyles["wine-list__filter-container"]}>
        <WineNameSearch
          value={filters.q}
          onChange={(q) => updateFilters({ q }, { replace: true })}
        />
        <fieldset className={winelistStyles["wine-list__type-fieldset"]}>
          <legend>Filtrer på type</legend>
          <div className={winelistStyles["wine-list__radio-group"]}>
            <div className={winelistStyles["wine-list__radio-group-children"]}>
              {WINE_TYPE_OPTIONS.map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    name="filterWines"
                    value={option.value}
                    checked={(filters.type ?? "alle") === option.value}
                    onChange={handleTypeChange}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </fieldset>
      </div>
      <ActiveFilters
        chips={chips}
        onRemove={(patch) => updateFilters(patch)}
        onClear={clearFilters}
      />
      {hasOpenedFilter && (
        <WineFilterForm
          id={FILTER_PANEL_ID}
          filters={filters}
          resultCount={wines.length}
          onChange={updateFilters}
          onClear={clearFilters}
          onClose={closeFilter}
        />
      )}
      <WineList wines={wines} />
    </div>
  );
};

export default WineSearch;
