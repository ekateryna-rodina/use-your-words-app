import React from "react";
import { Button } from "./Button";

type SquareButtonProps = {
  handler: () => void;
  isPrimary: boolean;
  children: React.ReactNode;
};
const SquareButton: React.FC<SquareButtonProps> = (props) => {
  const { handler, isPrimary, children } = props;
  const color = isPrimary ? "bg-green" : "transparent";
  return (
    <Button handler={handler} className={`square-pressable ${color}`}>
      {children}
    </Button>
  );
};

export default SquareButton;
