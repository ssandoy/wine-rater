import React from "react";

interface Props {
  label: string;
  value: string | number;
}

const WineItemCardInfoTextItem: React.FunctionComponent<Props> = ({
  label,
  value
}: Props) => {
  return (
    <div className="info-text-item">
      <p className="wine-item-card__label">{label}</p>
      <p className="wine-info-text">{value}</p>
    </div>
  );
};

export default WineItemCardInfoTextItem;
