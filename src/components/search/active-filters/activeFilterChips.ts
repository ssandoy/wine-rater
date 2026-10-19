import {
  PRICE_MAX,
  PRICE_MIN,
  WINE_TYPE_VALUES,
  type WineFilters,
} from "../../../utils/wine-filters";

const FITS_TO_LABELS: Record<string, string> = {
  apetirif: "Aperitiff",
  bull: "Storfe",
  cake: "Dessert",
  cheese: "Ost",
  chicken: "Kylling",
  deer: "Vilt",
  fish: "Fisk",
  pasta: "Pasta",
  pig: "Svin",
  pizza: "Pizza",
  seafood: "Sjømat",
};

export type ActiveFilterChip = {
  id: string;
  label: string;
  /** The change that removes this filter. */
  remove: Partial<WineFilters>;
};

const without = (values: string[], value: string) =>
  values.filter((v) => v !== value);

export const getActiveFilterChips = (
  filters: WineFilters
): ActiveFilterChip[] => {
  const chips: ActiveFilterChip[] = [];

  if (filters.q.trim()) {
    chips.push({ id: "q", label: `«${filters.q.trim()}»`, remove: { q: "" } });
  }
  if (filters.type) {
    chips.push({
      id: "type",
      label: WINE_TYPE_VALUES[filters.type],
      remove: { type: undefined },
    });
  }
  for (const key of ["grape", "country", "region"] as const) {
    for (const value of filters[key]) {
      chips.push({
        id: `${key}-${value}`,
        label: value,
        remove: { [key]: without(filters[key], value) },
      });
    }
  }
  for (const value of filters.fitsTo) {
    chips.push({
      id: `fitsTo-${value}`,
      label: FITS_TO_LABELS[value] ?? value,
      remove: { fitsTo: without(filters.fitsTo, value) },
    });
  }
  if (filters.minPrice > PRICE_MIN) {
    chips.push({
      id: "minPrice",
      label: `Over ${filters.minPrice} kr`,
      remove: { minPrice: PRICE_MIN },
    });
  }
  if (filters.maxPrice < PRICE_MAX) {
    chips.push({
      id: "maxPrice",
      label: `Under ${filters.maxPrice} kr`,
      remove: { maxPrice: PRICE_MAX },
    });
  }

  return chips;
};
