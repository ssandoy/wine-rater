import React, { useState } from "react";

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

  const closedOrOpen = isInfoTextOpen ? "" : "wine-info-text--closed";

  const marginCss = value ? "" : "info-text-item--no-margin";

  return (
    <div className={`info-text-item ${marginCss}`}>
      <p className="wine-item-card__label">{label}</p>
      {value && (
        <p onClick={toggleOpen} className={`wine-info-text ${closedOrOpen}`}>
          {value}
        </p>
      )}
    </div>
  );
};

export default WineItemCardInfoTextItem;
