import WineItemCard from "components/search/winelist/wine-item-card/wine-item-card";
import { useAppContext } from "../../../context/AppContext";
import type Wine from "../../../models/wine";
import winesearchStyles from "../winesearch.module.css";
import { WineItemCardSkeleton } from "./wine-item-card-skeleton";
import styles from "./winelist.module.css";

type Props = {
  wines: Wine[];
  /** Shown in the empty state when filters are active. */
  onClear?: () => void;
};

const WineList = ({ wines, onClear }: Props) => {
  const { isFetchingWines } = useAppContext();

  return (
    <div className="wine-list__container">
      {!isFetchingWines ? (
        <>
          <div
            className={styles["wine-list__hits-container"]}
            aria-live="polite"
          >
            {wines.length ? (
              <p className={styles["wine-list__hits-paragraph"]}>
                FANT {wines.length} {wines.length === 1 ? "VIN" : "VINER"} I
                SØKET
              </p>
            ) : (
              <div className={winesearchStyles["wine-search__no-hits"]}>
                <h3>Ingen viner matcher søket.</h3>
                {onClear && (
                  <button
                    type="button"
                    className={winesearchStyles["wine-search__no-hits-clear"]}
                    onClick={onClear}
                  >
                    Tøm søk
                  </button>
                )}
              </div>
            )}
          </div>
          <div className={styles["wine-item-list"]}>
            {wines?.map((wine: Wine) => (
              <WineItemCard key={wine.key} wine={wine} />
            ))}
          </div>
        </>
      ) : (
        <div className={styles["wine-list__hits-container"]}>
          <p className={styles["wine-list__hits-paragraph"]}>LASTER...</p>
        </div>
      )}
      {isFetchingWines && (
        <div className={styles["wine-list__hits-container"]}>
          <div className={styles["wine-item-list"]}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((val) => {
              return <WineItemCardSkeleton key={val} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WineList;
