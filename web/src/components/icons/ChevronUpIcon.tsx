import React from "react";
import { IconProps } from ".";

const ChevronUpIcon = ({ stroke }: IconProps) => {
  return (
    <svg
      width="15"
      height="10"
      viewBox="0 0 27 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 13.6667L13.6667 2L25.3333 13.6667"
        className={stroke}
        strokeWidth="2.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronUpIcon;
