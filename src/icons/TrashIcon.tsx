import React from "react";

type Props = {
  width?: string;
  height?: string;
  onClick?: () => void;
};

const TrashIcon: React.FC<Props> = ({
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
        d="M17.6602 6.46328L16.447 19.5406H7.55294L6.34002 6.46328L4.8031 6.59072L6.03817 19.9052C6.10317 20.5189 6.66607 21 7.31999 21H16.68C17.3337 21 17.8968 20.5191 17.9629 19.8964L19.1971 6.59072L17.6602 6.46328Z"
        fill="black"
      />
      <path
        d="M14.8285 3H9.17141C8.46245 3 7.88568 3.54559 7.88568 4.21623V6.52706H9.42852V4.45945H14.5714V6.52703H16.1142V4.2162C16.1143 3.54559 15.5375 3 14.8285 3Z"
        fill="black"
      />
      <path
        d="M20.2285 5.79749H3.77144C3.34534 5.79749 3 6.12416 3 6.52723C3 6.9303 3.34534 7.25697 3.77144 7.25697H20.2286C20.6547 7.25697 21 6.9303 21 6.52723C21 6.12416 20.6546 5.79749 20.2285 5.79749Z"
        fill="black"
      />
    </svg>
  );
};

export default TrashIcon;
