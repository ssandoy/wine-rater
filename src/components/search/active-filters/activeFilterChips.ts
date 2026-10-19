import {
  LIST_FILTER_KEYS,
  type ListFilterKey,
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

const LIST_FILTER_LABELS: Record<ListFilterKey, (value: string) => string> = {
  grape: (value) => value,
  country: (value) => value,
  region: (value) => value,
  fitsTo: (value) => FITS_TO_LABELS[value] ?? value,
};

export type ActiveFilterChip = {
  id: string;
  label: string;
  /** The change that removes this filter. */
  remove: Partial<WineFilters>;
};

export const getActiveFilterChips = (
  filters: WineFilters
): ActiveFilterChip[] => {
  const q = filters.q.trim();
  const listChips = LIST_FILTER_KEYS.flatMap((key) =>
    filters[key].map((value) => ({
      id: `${key}-${value}`,
      label: LIST_FILTER_LABELS[key](value),
      remove: { [key]: filters[key].filter((v) => v !== value) },
    }))
  );

  const chips: Array<ActiveFilterChip | false | "" | undefined> = [
    q && { id: "q", label: `«${q}»`, remove: { q: "" } },
    filters.type && {
      id: "type",
      label: WINE_TYPE_VALUES[filters.type],
      remove: { type: undefined },
    },
    ...listChips,
    filters.minPrice > PRICE_MIN && {
      id: "minPrice",
      label: `Over ${filters.minPrice} kr`,
      remove: { minPrice: PRICE_MIN },
    },
    filters.maxPrice < PRICE_MAX && {
      id: "maxPrice",
      label: `Under ${filters.maxPrice} kr`,
      remove: { maxPrice: PRICE_MAX },
    },
  ];

  return chips.filter((chip): chip is ActiveFilterChip => Boolean(chip));
};
