import React from "react";
import Slider from "rc-slider";
import { useWineFilterContext } from "../../../context/filter-context/WineFilterContext";
import "rc-slider/assets/index.css";

const BAR_HEIGHT = 16;
const HANDLE_SIZE = 24;
// todo fix width
const handleStyle = {
  height: HANDLE_SIZE,
  width: HANDLE_SIZE,
  borderColor: "#69183F",
  backgroundColor: "#69183F",
  marginTop: -4
};

const railStyle = {
  backgroundColor: "lightgrey",
  height: BAR_HEIGHT
};

export const WinePriceRange: React.FC = () => {
  const {
    filters: {
      maxPrice: { value: maxPrice, setValue: setMaxPrice },
      minPrice: { value: minPrice, setValue: setMinPrice }
    }
  } = useWineFilterContext();
  return (
    <Slider
      value={[minPrice, maxPrice]}
      max={1000}
      min={0}
      step={20}
      style={{ marginTop: 16 }}
      onChange={(value) => {
        setMinPrice(value[0]);
        setMaxPrice(value[1]);
      }}
      handleStyle={[handleStyle, handleStyle]}
      railStyle={railStyle}
      trackStyle={[{ backgroundColor: "#69183F", height: BAR_HEIGHT }]}
    />
  );
};
