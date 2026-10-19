import ImageCheckbox from "components/add-wine/image-checkbox/image-checkbox";
import { SearchDropDown } from "components/search-dropdown/search-dropdown";
import { Raastoff } from "data/raastoff";
import { type ImageKey, imageSources, imageKeys as imgKeys } from "images";
import { useEffect } from "react";
import { pushOrRemoveToArray } from "utils/array-utils";
import { useAppContext } from "../../../context/AppContext";
import ExitIcon from "../../../icons/ExitIcon";
import TrashIcon from "../../../icons/TrashIcon";
import type { WineFilters } from "../../../utils/wine-filters";
import { WinePriceRange } from "./WinePriceRange";
import styles from "./wineform.module.css";

type Props = {
  id: string;
  filters: WineFilters;
  resultCount: number;
  onChange: (patch: Partial<WineFilters>) => void;
  onClear: () => void;
  onClose: () => void;
};

const toOptions = (values: string[]) =>
  values.map((value) => ({ label: value, value }));

const WineFilterForm = ({
  id,
  filters,
  resultCount,
  onChange,
  onClear,
  onClose,
}: Props) => {
  const { allWines } = useAppContext();
  const imageKeys: ImageKey[] = imgKeys;
  const wineGrapeItems = Raastoff.values.map((value) => value.code);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <section
      id={id}
      aria-label="Filter"
      className={styles["wine-search-form__container"]}
    >
      <div className={styles["wine-search-form__exit-icon"]}>
        <button
          type="button"
          className={styles["wine-search-form__exit-button"]}
          aria-label="Lukk filter"
          onClick={onClose}
        >
          <ExitIcon />
        </button>
      </div>
      <div className={styles["wine-search-form"]}>
        <div className={styles["wine-search-form__row"]}>
          <span className={styles.label}>Drue</span>
          <SearchDropDown
            placeholder="Vindrue"
            searchItems={wineGrapeItems}
            selectedItems={toOptions(filters.grape)}
            onClick={(grape) => onChange({ grape })}
          />
        </div>
        <div className={styles["wine-search-form__row"]}>
          <span className={styles.label}>Land</span>
          <SearchDropDown
            placeholder="Land"
            selectedItems={toOptions(filters.country)}
            searchItems={[...new Set(allWines.map((wine) => wine.wineCountry))]}
            onClick={(country) => onChange({ country })}
          />
        </div>
        <div className={styles["wine-search-form__row"]}>
          <span className={styles.label}>Region</span>
          <SearchDropDown
            placeholder="Region"
            selectedItems={toOptions(filters.region)}
            searchItems={[
              ...new Set(
                allWines
                  .map((wine) => wine.wineRegion)
                  .filter((region) => region !== null)
              ),
            ]}
            onClick={(region) => onChange({ region })}
          />
        </div>

        <div className={styles["wine-search-form__row"]}>
          <span className={styles.label}>Hva passer vinen til?</span>
          <div className={styles["wine-search-form__fits-to-grid"]}>
            {imageKeys.map((imageKey) => {
              if (imageKey === "fish" || imageKey === "cake") {
                return null;
              }
              return (
                <div key={imageKey} className={styles["fits-to-cell"]}>
                  <ImageCheckbox
                    key={`${imageKey}searchForm`}
                    image={imageSources[imageKey]}
                    htmlFor={`${imageKey}searchForm`}
                    value={imageKey}
                    name="wineSearchForm"
                    checked={filters.fitsTo.includes(imageKey)}
                    onClick={(value) =>
                      onChange({
                        fitsTo: pushOrRemoveToArray(filters.fitsTo, value),
                      })
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles["wine-search-form__row"]}>
          <span className={styles.label}>Pris</span>
          <div className={styles["wine-search-form__range-container"]}>
            <WinePriceRange
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onChange={(minPrice, maxPrice) =>
                onChange({ minPrice, maxPrice })
              }
            />
          </div>
        </div>
        <div className={styles["wine-search-form__buttons-container"]}>
          <button
            type="button"
            className="wine-search-form__button"
            onClick={onClear}
          >
            <TrashIcon />
            Tøm søk
          </button>
          <button
            type="button"
            className={styles["wine-search-form__show-button"]}
            onClick={onClose}
          >
            Vis {resultCount} {resultCount === 1 ? "vin" : "viner"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default WineFilterForm;
