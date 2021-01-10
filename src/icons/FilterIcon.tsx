import React from "react";

type Props = {
  width?: string;
  height?: string;
  onClick?: () => void;
};

const FilterIcon: React.FC<Props> = ({
  width = "24",
  height = "24",
  onClick
}: Props) => {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.45827 3.74204C3.55775 3.53304 3.76857 3.3999 4.00004 3.3999H20C20.2315 3.3999 20.4423 3.53304 20.5418 3.74204C20.6413 3.95104 20.6117 4.19862 20.4657 4.37826L14.1 12.2129V20.4999C14.1 20.8313 13.8314 21.0999 13.5 21.0999H10.5C10.1687 21.0999 9.90004 20.8313 9.90004 20.4999V12.2129L3.53437 4.37826C3.38841 4.19862 3.3588 3.95104 3.45827 3.74204ZM5.26062 4.5999L10.9657 11.6215C11.0526 11.7285 11.1 11.8621 11.1 11.9999V19.8999H12.9V11.9999C12.9 11.8621 12.9475 11.7285 13.0344 11.6215L18.7395 4.5999H5.26062Z"
        fill="#EBEBEC"
      />
    </svg>
  );
};

export default FilterIcon;
