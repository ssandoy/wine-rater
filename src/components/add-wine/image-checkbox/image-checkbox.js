import React from "react";
import "./image-checkbox.scss";

const ImageCheckbox = props => {
  return (
    <div className={`${props.columnProps}`}>
      <label htmlFor={`${props.htmlFor}`}>
        <input
          type="checkbox"
          id={`${props.htmlFor}`}
          className="form-control"
          name={`${props.name}`}
          value={`${props.value}`}
          onChange={props.onChange}
        />
        <img
          src={props.image}
          className="image"
          alt={`${props.htmlFor}` + "-image"}
        />
      </label>
    </div>
  );
};

export default ImageCheckbox;
