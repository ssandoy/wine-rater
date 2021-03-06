import React from "react";
import "./styles.scss";

type Props = {
  dark?: boolean;
};
const Spinner = ({ dark = false }: Props) => {
  return <div className={`spinner ${dark ? "spinner--dark" : ""}`}></div>;
};

export default Spinner;
