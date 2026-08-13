import React from "react";
import Slider from "rc-slider";
import { formatAmount } from "../../../utils/formatAmount";
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

const getLefAlignment = (value: number): number => {
  if (value > 999) {
    return -12;
  }
  if (value < 100) {
    return 2;
  }
  return -6;
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
      range
      value={[minPrice, maxPrice]}
      max={1000}
      min={0}
      step={20}
      style={{ marginTop: 16 }}
      ariaLabelForHandle={["Minimumspris", "Maksimumspris"]}
      onChange={values => {
        if (!Array.isArray(values)) {
          return;
        }

        const [min, max] = values;
        setMinPrice(min);
        setMaxPrice(max);
      }}
      handleRender={(handle, handleProps) =>
        React.cloneElement(
          handle,
          undefined,
          <>
            <p
              style={{
                position: "absolute",
                bottom: handleProps.index === 0 ? -40 : 6,
                left: getLefAlignment(handleProps.value)
              }}
            >
              {formatAmount(handleProps.value)}
            </p>
          </>
        )
      }
      styles={{
        handle: handleStyle,
        rail: railStyle,
        track: { backgroundColor: "#69183F", height: BAR_HEIGHT }
      }}
    />
  );
};
