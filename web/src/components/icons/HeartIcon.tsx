import React from "react";
import { IconProps } from ".";

const HeartIcon = ({ fill }: IconProps) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_19_1603)">
        <path
          d="M12.5001 4.29383L11.3798 3.14226C8.75007 0.439138 3.92819 1.37195 2.18756 4.77039C1.37038 6.36883 1.186 8.67664 2.67819 11.622C4.11569 14.4579 7.10632 17.8548 12.5001 21.5548C17.8938 17.8548 20.8829 14.4579 22.3219 11.622C23.8141 8.67508 23.6313 6.36883 22.8126 4.77039C21.0719 1.37195 16.2501 0.437576 13.6204 3.1407L12.5001 4.29383ZM12.5001 23.4376C-11.4577 7.60633 5.1235 -4.74992 12.2251 1.78601C12.3188 1.87195 12.411 1.96101 12.5001 2.0532C12.5882 1.9611 12.68 1.87249 12.7751 1.78758C19.8751 -4.75305 36.4579 7.60476 12.5001 23.4376Z"
          className={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_19_1603">
          <rect width="25" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HeartIcon;
