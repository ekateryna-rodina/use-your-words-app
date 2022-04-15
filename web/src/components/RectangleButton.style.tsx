import React from "react";
import { Button } from "./Button";

type RectangleButtonProps = {
  handler: () => void;
  isPrimary: boolean;
  children: React.ReactNode;
};
const RectangleButton: React.FC<RectangleButtonProps> = (props) => {
  const { handler, isPrimary, children } = props;
  const color = isPrimary ? "bg-green" : "bg-gray-300 dark:bg-dark-500";
  return (
    <Button handler={handler} className={`rectangle-pressable ${color}`}>
      {children}
    </Button>
  );
};

export default RectangleButton;
