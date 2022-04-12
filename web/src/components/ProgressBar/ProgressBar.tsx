import React from "react";

const data = [...Array.from({ length: 100 }, (x, i) => i)] as const;
type ProgressBarProps = {
  progress: typeof data[number];
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const ColorsMap = [
    [0, 33, "var(--gray-700-color)"],
    [34, 67, "var(--yellow-color)"],
    [68, 100, "var(--green-color)"],
  ];
  let currentColorVar = ColorsMap.filter(
    (m) => progress >= m[0] && progress <= m[1]
  )[0][2];
  return (
    <div className="w-11/12 m-auto my-2 bg-white h-2 rounded-sm dark:bg-dark-800">
      <div
        className="relative h-2 rounded-sm"
        style={{ width: `${progress}%`, background: currentColorVar }}
      >
        <span className="absolute top-3 left-1/2 text-sm -translate-x-1/2 text-gray-800 dark:text-light">{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
