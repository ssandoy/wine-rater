import styles from "./styles.module.css";

type Props = {
  dark?: boolean;
};
const Spinner = ({ dark = false }: Props) => {
  return (
    <div
      className={`${styles.spinner} ${dark ? styles["spinner--dark"] : ""}`}
    ></div>
  );
};

export default Spinner;
