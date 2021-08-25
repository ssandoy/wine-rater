import React from "react";
import styled from "@emotion/styled";
import WineItemCardInfoTextItem from "../wine-item-card/wine-item-card-info-text-item";
import { keyframes } from "@emotion/css";

type ShimmerTextProps = {
  dropMargin?: boolean;
};

const shimmer = keyframes`
  0% {
    background-position: left;
  }
  100% {
    background-position: right;
  }
`;

const ShimmerStyle = styled.div<ShimmerTextProps>`
  background: linear-gradient(to right, #f0f3f5ff 20%, #d3d3d3 40%, #f0f3f5ff);
  background-size: 200%;
  animation: ${shimmer} 0.9s infinite linear alternate;
`;

const ShimmerText = styled(ShimmerStyle)`
  width: 50px;
  height: 20px;
  margin-bottom: ${props => (props.dropMargin ? `0` : `20px`)};
`;

const ShimmerIcon = styled(ShimmerStyle)`
  width: 105px;
  height: 380px;
`;

const ShimmerTitle = styled.div`
  width: 200px;
  height: 30px;
  background: linear-gradient(to right, #20292f 10%, #d3d3d3 30%, #20292f);
  background-size: 200%;
  animation: ${shimmer} 0.9s infinite linear alternate;
`;

// todo generalize component
const WineItemCardSkeleton: React.FC = () => {
  return (
    <div className="wine-item-card">
      <div className="wine-item-card__card-header">
        <ShimmerTitle />
      </div>
      <div className="wine-item-card__card-body">
        <div className="wine-item-card__card-body-col-1 wine-item-card__card-body-row-1">
          <ShimmerIcon />
        </div>
        <div className="wine-item-card__card-body-col-2 wine-item-card__card-body-row-1">
          <WineItemCardInfoTextItem label="Type" />
          <ShimmerText />
          <WineItemCardInfoTextItem label="Årgang" />
          <ShimmerText />
          <WineItemCardInfoTextItem label="Land" />
          <ShimmerText />
          <WineItemCardInfoTextItem label="Region" />
          <ShimmerText />
          <WineItemCardInfoTextItem label="Druer" />
          <ShimmerText />
          <WineItemCardInfoTextItem label="Pris" />
          <ShimmerText />
        </div>
        <div className="wine-item-card__card-body-wine-row">
          <p className="wine-item-card__label">Passer til</p>
        </div>
        <div className="wine-item-card__card-body-wine-row">
          <ShimmerText />
        </div>
        <div className="wine-item-card__card-body-line-row">
          <hr />
        </div>
        <div className="wine-item-card__card-body-wine-row">
          <p className="wine-item-card__label">Rating</p>
        </div>
        <div className="wine-item-card__card-body-col-1 wine-item-card__card-body-rating-col">
          <p className="wine-item-card__rating-label">Ine</p>
          <div className="wine-item-card__rating-number">
            <ShimmerText dropMargin={true} />
          </div>
        </div>
        <div className="wine-item-card__card-body-col-2 wine-item-card__card-body-rating-col">
          <p className="wine-item-card__rating-label">Sander</p>
          <div className="wine-item-card__rating-number">
            <ShimmerText dropMargin={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineItemCardSkeleton;
