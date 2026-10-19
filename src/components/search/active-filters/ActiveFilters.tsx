import CrossIcon from "../../../icons/CrossIcon";
import type { WineFilters } from "../../../utils/wine-filters";
import styles from "./active-filters.module.css";
import type { ActiveFilterChip } from "./activeFilterChips";

type Props = {
  chips: ActiveFilterChip[];
  onRemove: (patch: Partial<WineFilters>) => void;
  onClear: () => void;
};

export const ActiveFilters = ({ chips, onRemove, onClear }: Props) => {
  if (!chips.length) {
    return null;
  }

  return (
    <ul className={styles["active-filters"]} aria-label="Aktive filtre">
      {chips.map((chip) => (
        <li key={chip.id}>
          <button
            type="button"
            className={styles["active-filters__chip"]}
            aria-label={`Fjern filter ${chip.label}`}
            onClick={() => onRemove(chip.remove)}
          >
            {chip.label}
            <CrossIcon />
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          className={styles["active-filters__clear"]}
          onClick={onClear}
        >
          Tøm søk
        </button>
      </li>
    </ul>
  );
};
