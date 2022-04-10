import React from "react";

type SquareButtonProps = {
  handler: () => void;
  isPrimary: boolean;
  children: React.ReactNode;
};
const SquareButton: React.FC<SquareButtonProps> = (props) => {
  const { handler, isPrimary, children } = props;
  const color = isPrimary ? "bg-purple" : "transparent";
  return (
    <button
      className={`flex justify-center items-center w-7 h-7 my-1 rounded-sm shadow-md ${color}`}
      onClick={handler}
    >
      {children}
    </button>
  );
};

export default SquareButton;
