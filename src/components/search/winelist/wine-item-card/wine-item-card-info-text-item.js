import React from "react";

const WineItemCardInfoTextItem = ({ label, value }) => {
  return (
    <div className="info-text-item">
      <p className="card-label">{label}</p>
      <p className="wine-info-text">{value}</p>
    </div>
  );
};

export default WineItemCardInfoTextItem;
