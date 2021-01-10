import React from "react";

type Props = {
  width?: string;
  height?: string;
  onClick?: () => void;
};

const SearchIcon: React.FC<Props> = ({
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
        d="M19.664 20.0447L14.4847 14.3514C15.6517 13.1213 16.2931 11.5127 16.2931 9.80488C16.2931 8.04615 15.6133 6.3919 14.3784 5.14859C13.1435 3.90527 11.5025 3.21951 9.75693 3.21951C8.01134 3.21951 6.36946 3.90439 5.13544 5.14859C3.90141 6.39278 3.22078 8.04615 3.22078 9.80488C3.22078 11.5636 3.90054 13.2179 5.13544 14.4612C6.37033 15.7045 8.01134 16.3902 9.75693 16.3902C11.2611 16.3902 12.6869 15.8819 13.8425 14.9459L19.0217 20.6382C19.108 20.7331 19.2248 20.7805 19.3433 20.7805C19.4487 20.7805 19.5542 20.7427 19.6379 20.6655C19.8156 20.5013 19.827 20.2238 19.6649 20.0456L19.664 20.0447ZM4.09139 9.80488C4.09139 6.65795 6.63265 4.09756 9.75606 4.09756C12.8795 4.09756 15.4207 6.65795 15.4207 9.80488C15.4207 12.9518 12.8795 15.5122 9.75606 15.5122C6.63265 15.5122 4.09139 12.9518 4.09139 9.80488Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6649 20.0456C19.827 20.2238 19.8156 20.5013 19.6379 20.6655C19.5542 20.7427 19.4487 20.7805 19.3433 20.7805C19.2248 20.7805 19.108 20.7331 19.0217 20.6382L13.8425 14.9459C13.8425 14.9459 13.8425 14.9458 13.8425 14.9459C12.6869 15.8819 11.2611 16.3902 9.75693 16.3902C8.01134 16.3902 6.37033 15.7045 5.13544 14.4612C3.90054 13.2179 3.22078 11.5636 3.22078 9.80488C3.22078 8.04615 3.90141 6.39278 5.13544 5.14859C6.36946 3.90439 8.01134 3.21951 9.75693 3.21951C11.5025 3.21951 13.1435 3.90527 14.3784 5.14859C15.6133 6.3919 16.2931 8.04615 16.2931 9.80488C16.2931 11.5127 15.6517 13.1213 14.4847 14.3514L19.664 20.0447L19.6649 20.0456ZM19.8244 19.8938L14.7833 14.3523C15.9016 13.1017 16.5139 11.4999 16.5139 9.80488C16.5139 7.98889 15.8116 6.27909 14.5355 4.99434C13.2595 3.70966 11.5621 3 9.75693 3C7.95187 3 6.25348 3.7087 4.97824 4.99445C3.70325 6.27995 3 7.98878 3 9.80488C3 11.6209 3.7023 13.3307 4.97835 14.6154C6.25433 15.9001 7.95175 16.6098 9.75693 16.6098C11.2414 16.6098 12.6528 16.1306 13.8172 15.2453L18.858 20.7855C18.9877 20.9281 19.1647 21 19.3433 21C19.5021 21 19.6619 20.9429 19.7881 20.8263C20.0547 20.5801 20.0714 20.1653 19.8286 19.8983L19.8244 19.8938ZM9.75606 4.31707C6.75733 4.31707 4.31217 6.77643 4.31217 9.80488C4.31217 12.8333 6.75733 15.2927 9.75606 15.2927C12.7548 15.2927 15.1999 12.8333 15.1999 9.80488C15.1999 6.77643 12.7548 4.31707 9.75606 4.31707ZM9.75606 4.09756C6.63265 4.09756 4.09139 6.65795 4.09139 9.80488C4.09139 12.9518 6.63265 15.5122 9.75606 15.5122C12.8795 15.5122 15.4207 12.9518 15.4207 9.80488C15.4207 6.65795 12.8795 4.09756 9.75606 4.09756Z"
        fill="black"
      />
    </svg>
  );
};

export default SearchIcon;
