import React from "react";

type ButtonProps = {
  handler: () => void;
  className?: string;
  children: React.ReactNode;
};
const Button: React.FC<ButtonProps> = ({
  handler,
  className,
  children,
}: ButtonProps) => {
  return (
    <button onClick={handler} className={className}>
      {children}
    </button>
  );
};

export default Button;
