import React from "react";
import { IconProps } from ".";
import { FillColor } from "../../types";

// map is needed for gradient
const ColorVarsMap = {
  "fill-green": "var(--green-color)",
  "fill-yellow": "var(--yellow-color)",
  "fill-gray-300": "var(--gray-color)",
  "fill-light": "var(--light-color)",
};

type StarIconProps = Omit<IconProps, "fill"> & {
  fill: FillColor | [FillColor, FillColor];
};

const StarIcon = ({ fill }: StarIconProps) => {
  const isGradient = Array.isArray(fill);
  const pathProps = isGradient
    ? { fill: "url(#paint0_linear_19_1837)" }
    : { className: fill as FillColor };
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 33 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 0L20.2045 11.4012H32.1924L22.494 18.4476L26.1985 29.8488L16.5 22.8024L6.80154 29.8488L10.506 18.4476L0.807568 11.4012H12.7955L16.5 0Z"
        {...pathProps}
      />
      <defs>
        <linearGradient
          id="paint0_linear_19_1837"
          x1="16.5"
          y1="0"
          x2="16.5"
          y2="33"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor={
              isGradient
                ? ColorVarsMap[fill[1] as keyof typeof ColorVarsMap]
                : "transparent"
            }
          />
          <stop
            offset="1"
            stopColor={
              isGradient
                ? ColorVarsMap[fill[0] as keyof typeof ColorVarsMap]
                : "transparent"
            }
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default StarIcon;
