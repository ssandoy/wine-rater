import type React from "react";
import { useState } from "react";
import styles from "./wine-item-card.module.css";

interface Props {
  label: string;
  value?: string | number;
}

const WineItemCardInfoTextItem: React.FunctionComponent<Props> = ({
  label,
  value,
}: Props) => {
  const [isInfoTextOpen, setIsInfoTextOpen] = useState(false);
  const toggleOpen = (): void => {
    setIsInfoTextOpen(!isInfoTextOpen);
  };

  const closedOrOpen = isInfoTextOpen ? "" : styles["wine-info-text--closed"];

  const marginCss = value ? "" : styles["info-text-item--no-margin"];

  return (
    <div className={`${styles["info-text-item"]} ${marginCss}`}>
      <p className={styles["wine-item-card__label"]}>{label}</p>
      {value && (
        <button
          type="button"
          onClick={toggleOpen}
          className={`${styles["wine-info-text"]} ${closedOrOpen}`}
        >
          {value}
        </button>
      )}
    </div>
  );
};

export default WineItemCardInfoTextItem;
