import React from "react";

type Props = {
  width?: string;
  height?: string;
  onClick?: () => void;
};

const PlusIcon: React.FC<Props> = ({ height = "24", width = "24" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3L12 21"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M21 12L3 12"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PlusIcon;
