import React from "react";
import { ColorsMap } from "../../constants";

const data = [...Array.from({ length: 100 }, (x, i) => i)] as const;
type ProgressBarProps = {
  progress: typeof data[number];
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const currentColorVar = ColorsMap.filter(
    (m) => progress >= m[0] && progress <= m[1]
  )[0][2];

  return (
    <div
      className={`w-11/12 m-auto my-2 bg-gray-200 h-4 rounded-sm dark:bg-dark-700`}
    >
      <div
        className="relative h-4 rounded-sm"
        style={{
          width: `${progress}%`,
          background: currentColorVar,
        }}
      >
        <span className="absolute top-1/2 left-1/2 -translate-y-1/2 text-[9px] -translate-x-1/2 font-semibold text-light">{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
