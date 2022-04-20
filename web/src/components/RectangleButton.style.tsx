import React from "react";
import { Button } from "./Button";

type RectangleButtonProps = {
  handler: () => void;
  isPrimary: boolean;
  children: React.ReactNode;
  isDisabled?: boolean;
};
const RectangleButton: React.FC<RectangleButtonProps> = (props) => {
  const { handler, isDisabled, isPrimary, children } = props;
  const color = isPrimary ? "bg-green" : "bg-gray-300 dark:bg-dark-500";
  const disabled = isDisabled
    ? "pointer-events-none bg-gray-100 text-gray-300 dark:bg-dark-600"
    : "pointer-events-auto";
  return (
    <Button
      handler={handler}
      className={`rectangle-pressable ${color} ${disabled}`}
    >
      {children}
    </Button>
  );
};

export default RectangleButton;
