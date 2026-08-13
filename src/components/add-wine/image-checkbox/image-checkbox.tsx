import type React from "react";
import styles from "./image-checkbox.module.css";

interface Props {
  htmlFor: string;
  name: string;
  value: string;
  onClick: (value: string) => void;
  image: string;
  checked: boolean;
}

const ImageCheckbox: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div>
      <label htmlFor={`${props.htmlFor}`}>
        <input
          className={styles.checkbox}
          type="checkbox"
          id={`${props.htmlFor}`}
          name={`${props.name}`}
          value={`${props.value}`}
          checked={props.checked}
          onChange={() => props.onClick(props.value)}
        />
        <img
          src={props.image}
          className={styles.image}
          alt={`${props.htmlFor}`}
        />
      </label>
    </div>
  );
};

export default ImageCheckbox;
