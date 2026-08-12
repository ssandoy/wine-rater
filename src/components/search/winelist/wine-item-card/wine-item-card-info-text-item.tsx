import React, { useState } from "react";
import styles from "./wine-item-card.module.css";

interface Props {
  label: string;
  value?: string | number;
}

const WineItemCardInfoTextItem: React.FunctionComponent<Props> = ({
  label,
  value
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
        <p onClick={toggleOpen} className={`${styles["wine-info-text"]} ${closedOrOpen}`}>
          {value}
        </p>
      )}
    </div>
  );
};

export default WineItemCardInfoTextItem;
