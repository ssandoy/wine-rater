import WineItemCard from "components/search/winelist/wine-item-card/wine-item-card";
import { useAppContext } from "../../../context/AppContext";
import type Wine from "../../../models/wine";
import winesearchStyles from "../winesearch.module.css";
import { WineItemCardSkeleton } from "./wine-item-card-skeleton";
import styles from "./winelist.module.css";

const WineList = () => {
  const { filteredWines: wines, isFetchingWines } = useAppContext();

  return (
    <div className="wine-list__container">
      {!isFetchingWines && !wines?.length && (
        <h3 className={winesearchStyles["wine-search__no-hits"]}>
          Ingen viner matcher søket.
        </h3>
      )}
      {!isFetchingWines ? (
        <>
          <div className={styles["wine-list__hits-container"]}>
            <p className={styles["wine-list__hits-paragraph"]}>
              FANT {wines.length} {wines.length === 1 ? "VIN" : "VINER"} I SØKET
            </p>
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
