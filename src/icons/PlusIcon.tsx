import type { IconProps } from "./types";

const PlusIcon = ({ height = "24", width = "24" }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
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
