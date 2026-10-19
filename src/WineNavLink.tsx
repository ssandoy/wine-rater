import { NavLink } from "react-router";

type Props = {
  route: string;
  title: string;
};

export const WineNavLink = ({ route, title }: Props) => {
  return (
    <NavLink
      end
      to={route}
      style={({ isActive }) => ({
        color: "white",
        textDecoration: "none",
        marginTop: 8,
        borderBottom: isActive ? "1px solid white" : undefined,
      })}
    >
      {title}
    </NavLink>
  );
};
