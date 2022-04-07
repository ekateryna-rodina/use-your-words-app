import React from "react";
import { IconProps } from ".";

const SuperheroIcon = ({ fill }: IconProps) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.425 17.5L31.5 3.5L12.25 17.5H15.75L3.5 31.5L22.75 17.5H19.425ZM11.9 19.25H6.825L11.2 16.1L24.325 6.475L17.5 3.5L5.25 8.75V14C5.25 17.5 6.125 20.825 7.875 23.8L11.9 19.25ZM23.1 15.75H28L23.8 18.9L11.375 28C13.125 29.575 15.225 30.8 17.5 31.5C24.85 28.875 29.925 21.875 29.75 14V8.75L29.4 8.575L23.1 15.75Z"
        className={fill}
      />
    </svg>
  );
};

export default SuperheroIcon;
