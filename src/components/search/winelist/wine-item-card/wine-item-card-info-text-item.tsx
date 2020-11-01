import React, { useState } from "react";

interface Props {
  label: string;
  value: string | number;
}

const WineItemCardInfoTextItem: React.FunctionComponent<Props> = ({
  label,
  value
}: Props) => {
  const [isInfoTextOpen, setIsInfoTextOpen] = useState(false);
  const toggleOpen = (): void => {
    setIsInfoTextOpen(!isInfoTextOpen);
  };

  const closedOrOpen = isInfoTextOpen ? "" : "wine-info-text--closed";

  return (
    <div className="info-text-item">
      <p className="wine-item-card__label">{label}</p>
      <p onClick={toggleOpen} className={`wine-info-text ${closedOrOpen}`}>
        {value}
      </p>
    </div>
  );
};

export default WineItemCardInfoTextItem;
