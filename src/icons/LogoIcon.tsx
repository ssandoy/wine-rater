import React from "react";

type Props = {
  width?: string;
  height?: string;
  onClick?: () => void;
};

const LogoIcon: React.FC<Props> = ({
  height = "100",
  width = "300"
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 377 107"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path d="M272.564 60V90" stroke="white" strokeWidth="1.5" />
      </g>
      <g filter="url(#filter1_d)">
        <path
          d="M56.9502 25.0703H64.9365L38.0464 91H29.4229L4.31689 25.0703H13.6626L34.563 80.3374L56.9502 25.0703ZM79.9287 91H72.0381V30.375H79.9287V91ZM98.6787 91H91.4131V30.375H99.2256L126.921 73.4609L129.46 78.2656L129.304 73.5V30.375H136.569V91H128.835L101.062 47.7188L98.5225 42.8359L98.6787 47.7188V91ZM171.765 92.8359C164.187 92.8359 158.002 90.0495 153.21 84.4766C148.418 78.9036 146.022 70.974 146.022 60.6875C146.022 50.401 148.418 42.4844 153.21 36.9375C158.002 31.3646 164.187 28.5781 171.765 28.5781C179.343 28.5781 185.528 31.3646 190.319 36.9375C195.137 42.4844 197.546 50.401 197.546 60.6875C197.546 70.974 195.137 78.9036 190.319 84.4766C185.528 90.0495 179.343 92.8359 171.765 92.8359ZM171.765 86.7422C177.285 86.7422 181.595 84.3724 184.694 79.6328C187.793 74.8672 189.343 68.5521 189.343 60.6875C189.343 52.849 187.793 46.5469 184.694 41.7812C181.595 37.0156 177.285 34.6328 171.765 34.6328C166.27 34.6328 161.96 37.0156 158.835 41.7812C155.736 46.5469 154.187 52.849 154.187 60.6875C154.187 68.5521 155.736 74.8672 158.835 79.6328C161.96 84.3724 166.27 86.7422 171.765 86.7422Z"
          fill="white"
        />
        <path
          d="M206.96 91V30.375H214.851V84.3203H246.647V91H206.96ZM314.382 91H307.116V30.375H314.929L342.624 73.4609L345.163 78.2656L345.007 73.5V30.375H352.272V91H344.538L316.765 47.7188L314.226 42.8359L314.382 47.7188V91ZM372.918 91H364.337V25.0703H372.918V91Z"
          fill="#69183F"
        />
      </g>
      <g filter="url(#filter2_d)">
        <path
          d="M294.064 29.5C297.564 40 299.596 45.3736 295.564 52.5C291.532 59.6264 278.766 60 273.064 60C267.362 60 253.096 59.6264 249.064 52.5C245.032 45.3736 247.564 39.5 251.064 29.5L257.564 13H273.064H288.564L294.064 29.5Z"
          stroke="white"
          strokeLinejoin="round"
        />
      </g>
      <g filter="url(#filter3_d)">
        <path
          d="M291.054 31.0425C294.033 39.9787 295.762 44.552 292.331 50.617C288.899 56.682 278.035 57 273.182 57C268.329 57 256.188 56.682 252.756 50.617C249.325 44.552 251.48 39.5532 254.459 31.0425L273.182 31.0426L291.054 31.0425Z"
          fill="#69183F"
        />
        <path
          d="M291.054 31.0425C294.033 39.9787 295.762 44.552 292.331 50.617C288.899 56.682 278.035 57 273.182 57C268.329 57 256.188 56.682 252.756 50.617C249.325 44.552 251.48 39.5532 254.459 31.0425L273.182 31.0426L291.054 31.0425Z"
          stroke="#69183F"
          strokeLinejoin="round"
        />
      </g>
      <g filter="url(#filter4_d)">
        <path d="M285 90H260" stroke="white" strokeWidth="1.5" />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="267.814"
          y="60"
          width="9.5"
          height="38"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d"
          x="0.316895"
          y="25.0703"
          width="376.602"
          height="75.7656"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d"
          x="242.5"
          y="12.5"
          width="59.7867"
          height="56"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d"
          x="246.5"
          y="30.5425"
          width="52.2227"
          height="34.9574"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_d"
          x="256"
          y="89.25"
          width="33"
          height="9.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LogoIcon;
