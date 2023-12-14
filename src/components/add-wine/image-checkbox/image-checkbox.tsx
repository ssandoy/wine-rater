import React from "react";
import "./image-checkbox.scss";

interface Props {
  htmlFor: string;
  name: string;
  value: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (event?: any) => void;
  image: string;
  checked: boolean;
}

const ImageCheckbox: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div>
      <label htmlFor={`${props.htmlFor}`}>
        <input
          type="checkbox"
          id={`${props.htmlFor}`}
          name={`${props.name}`}
          value={`${props.value}`}
          checked={props.checked}
          onChange={() => null}
        />
        <img
          src={props.image}
          className="image"
          alt={`${props.htmlFor}`}
          onClick={() => props.onClick(props.value)}
        />
      </label>
    </div>
  );
};

export default ImageCheckbox;
