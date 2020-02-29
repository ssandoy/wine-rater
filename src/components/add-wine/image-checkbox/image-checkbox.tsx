import React from "react";
import "./image-checkbox.scss";

interface Props {
  htmlFor: string;
  name: string;
  value: string | number;
  onChange: any;
  image: string;
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
          onChange={props.onChange}
        />
        <img src={props.image} className="image" alt={`${props.htmlFor}`} />
      </label>
    </div>
  );
};

export default ImageCheckbox;
