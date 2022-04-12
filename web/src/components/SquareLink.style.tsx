import React from "react";
import { Link } from "react-router-dom";

type SquareLinkProps = {
  to: string;
  children?: React.ReactNode;
};
const SquareLink = (props: SquareLinkProps) => {
  const { to, children } = props;
  return (
    <Link to={to} className="square-pressable bg-green">
      {children}
    </Link>
  );
};

export default SquareLink;
