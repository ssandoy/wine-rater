import Slider from "rc-slider";
import React, { useState } from "react";
import { formatAmount } from "../../../utils/formatAmount";
import { PRICE_MAX, PRICE_MIN, PRICE_STEP } from "../../../utils/wine-filters";
import "rc-slider/assets/index.css";

const BAR_HEIGHT = 16;
const HANDLE_SIZE = 24;
// todo fix width
const handleStyle = {
  height: HANDLE_SIZE,
  width: HANDLE_SIZE,
  borderColor: "#69183F",
  backgroundColor: "#69183F",
  marginTop: -4,
};

const railStyle = {
  backgroundColor: "lightgrey",
  height: BAR_HEIGHT,
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

type Props = {
  minPrice: number;
  maxPrice: number;
  onChange: (minPrice: number, maxPrice: number) => void;
};

export const WinePriceRange = ({ minPrice, maxPrice, onChange }: Props) => {
  // Shown while dragging; the filter is only applied when the handle is released.
  const [draft, setDraft] = useState<[number, number] | null>(null);

  return (
    <Slider
      range
      value={draft ?? [minPrice, maxPrice]}
      max={PRICE_MAX}
      min={PRICE_MIN}
      step={PRICE_STEP}
      style={{ marginTop: 16 }}
      ariaLabelForHandle={["Minimumspris", "Maksimumspris"]}
      onChange={(values) => {
        if (!Array.isArray(values)) {
          return;
        }

        const [min, max] = values;
        setDraft([min, max]);
      }}
      onChangeComplete={(values) => {
        setDraft(null);
        if (!Array.isArray(values)) {
          return;
        }

        const [min, max] = values;
        onChange(min, max);
      }}
      handleRender={(handle, handleProps) =>
        React.cloneElement(
          handle,
          undefined,
          <p
            style={{
              position: "absolute",
              bottom: handleProps.index === 0 ? -40 : 6,
              left: getLefAlignment(handleProps.value),
            }}
          >
            {handleProps.value >= PRICE_MAX
              ? `${PRICE_MAX}+`
              : formatAmount(handleProps.value)}
          </p>
        )
      }
      styles={{
        handle: handleStyle,
        rail: railStyle,
        track: { backgroundColor: "#69183F", height: BAR_HEIGHT },
      }}
    />
  );
};
