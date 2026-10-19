import { useSearchParams } from "react-router";
import {
  parseWineFilters,
  serializeWineFilters,
  type WineFilters,
} from "../../utils/wine-filters";

type UpdateOptions = {
  /** Replace the current history entry instead of pushing a new one. */
  replace?: boolean;
};

export const useWineFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = parseWineFilters(searchParams);

  const updateFilters = (
    patch: Partial<WineFilters>,
    { replace = false }: UpdateOptions = {}
  ) =>
    setSearchParams(
      (prev) => serializeWineFilters({ ...parseWineFilters(prev), ...patch }),
      { replace }
    );

  const clearFilters = () => setSearchParams(new URLSearchParams());

  return { filters, updateFilters, clearFilters };
};
