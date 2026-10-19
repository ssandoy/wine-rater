import type Wine from "../models/wine";
import { matchesAny } from "./array-utils";

export const PRICE_MIN = 0;
export const PRICE_MAX = 1000;
export const PRICE_STEP = 20;

export type WineTypeFilter = "rod" | "hvit";

export const WINE_TYPE_VALUES: Record<WineTypeFilter, string> = {
  rod: "Rødvin",
  hvit: "Hvitvin",
};

export const LIST_FILTER_KEYS = [
  "grape",
  "country",
  "region",
  "fitsTo",
] as const;

export type ListFilterKey = (typeof LIST_FILTER_KEYS)[number];

export type WineFilters = {
  q: string;
  type?: WineTypeFilter;
  grape: string[];
  country: string[];
  region: string[];
  fitsTo: string[];
  minPrice: number;
  maxPrice: number;
};

const isWineTypeFilter = (value: string | null): value is WineTypeFilter =>
  value === "rod" || value === "hvit";

const parseList = (params: URLSearchParams, key: string): string[] => [
  ...new Set(
    params
      .getAll(key)
      .map((value) => value.trim())
      .filter(Boolean)
  ),
];

const parsePrice = (value: string | null, fallback: number): number => {
  if (value === null || value.trim() === "") {
    return fallback;
  }
  const price = Number(value);
  if (!Number.isFinite(price)) {
    return fallback;
  }
  return Math.min(PRICE_MAX, Math.max(PRICE_MIN, Math.round(price)));
};

export const parseWineFilters = (params: URLSearchParams): WineFilters => {
  const type = params.get("type");
  const minPrice = parsePrice(params.get("minPrice"), PRICE_MIN);
  const maxPrice = parsePrice(params.get("maxPrice"), PRICE_MAX);

  return {
    q: params.get("q") ?? "",
    type: isWineTypeFilter(type) ? type : undefined,
    grape: parseList(params, "grape"),
    country: parseList(params, "country"),
    region: parseList(params, "region"),
    fitsTo: parseList(params, "fitsTo"),
    minPrice: Math.min(minPrice, maxPrice),
    maxPrice: Math.max(minPrice, maxPrice),
  };
};

/** Default values are left out, so an unfiltered search is an empty query. */
export const serializeWineFilters = (filters: WineFilters): URLSearchParams => {
  const params = new URLSearchParams();
  if (filters.q.trim()) {
    params.set("q", filters.q);
  }
  if (filters.type) {
    params.set("type", filters.type);
  }
  for (const key of LIST_FILTER_KEYS) {
    for (const value of filters[key]) {
      params.append(key, value);
    }
  }
  if (filters.minPrice > PRICE_MIN) {
    params.set("minPrice", String(filters.minPrice));
  }
  if (filters.maxPrice < PRICE_MAX) {
    params.set("maxPrice", String(filters.maxPrice));
  }
  return params;
};

export const filterWines = (
  wines: readonly Wine[],
  filters: WineFilters
): Wine[] => {
  const query = filters.q.trim().toLowerCase();
  const wineType = filters.type && WINE_TYPE_VALUES[filters.type];

  return wines.filter(
    (wine) =>
      wine.wineName.toLowerCase().includes(query) &&
      (!wineType || wine.wineType === wineType) &&
      matchesAny(wine.fitsTo, filters.fitsTo) &&
      matchesAny(wine.wineGrapes, filters.grape) &&
      matchesAny(wine.wineCountry, filters.country) &&
      matchesAny(wine.wineRegion, filters.region) &&
      // Wines without a price are never excluded, and PRICE_MAX means "no upper limit".
      (!wine.price ||
        (wine.price >= filters.minPrice &&
          (filters.maxPrice >= PRICE_MAX || wine.price <= filters.maxPrice)))
  );
};
