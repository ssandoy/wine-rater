import React, { Component } from "react";
import "./image-checkbox.scss";

class ImageCheckbox extends Component {
  render() {
    return (
      <div className={`${this.props.columnProps}`}>
        <label htmlFor={`${this.props.htmlFor}`}>
          <input
            type="checkbox"
            id={`${this.props.htmlFor}`}
            className="form-control"
            name={`${this.props.name}`}
            value={`${this.props.value}`}
            onChange={this.props.onChange}
          />
          <img
            src={this.props.image}
            className="image"
            alt={`${this.props.htmlFor}` + "-image"}
          />
        </label>
      </div>
    );
  }
}

export default ImageCheckbox;
