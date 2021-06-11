import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  route: string;
  title: string;
};

export const WineNavLink: React.FC<Props> = ({ route, title }: Props) => {
  return (
    <NavLink
      exact
      to={route}
      style={{ color: "white", textDecoration: "none", marginTop: 8 }}
      activeStyle={{
        color: "white",
        borderBottom: "1px solid white"
      }}
    >
      {title}
    </NavLink>
  );
};
