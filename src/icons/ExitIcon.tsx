import React from "react";

type Props = {
  width?: string;
  height?: string;
  onClick?: () => void;
};

const ExitIcon: React.FC<Props> = ({
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
        d="M18.364 5.63623L5.63609 18.3642"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M18.364 18.3638L5.63609 5.63585"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ExitIcon;
