import React from "react";
import { IconProps } from ".";

const ChevronDownIcon = ({ stroke }: IconProps) => {
  return (
    <svg
      width="15"
      height="10"
      viewBox="0 0 27 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2L13.6667 13.6667L25.3333 2"
        className={stroke}
        strokeWidth="2.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronDownIcon;
