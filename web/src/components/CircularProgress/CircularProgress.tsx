import React from "react";
import { useAppSelector } from "../../app/hooks";

const cleanPercentage = (percentage: number) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0;
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

type CircleProps = {
  color: string;
  percentage?: number;
};
const Circle = ({ color, percentage }: CircleProps) => {
  const r = 50;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - (percentage ?? 1)) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? color : ""}
      strokeWidth={".5rem"}
      strokeLinecap="round"
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    ></circle>
  );
};

type PieProps = {
  percentage: number;
  color: string;
  baseColor: string;
};
const Pie = ({ percentage, color, baseColor }: PieProps) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle color={baseColor} />
        <Circle color={color} percentage={pct} />
      </g>
    </svg>
  );
};

type CircularProgressProps = {
  progress: number;
};
const CircularProgress = ({ progress }: CircularProgressProps) => {
  const { isDark } = useAppSelector((state) => state.theme);
  const ColorsMap = [
    [0, 33, "#2EC0A6"],
    [34, 67, "#D1AA3F"],
    [68, 100, "#BB2AD2"],
  ];
  let currentColor: string = ColorsMap.filter(
    (m) => progress >= m[0] && progress <= m[1]
  )[0][2] as string;
  return (
    <Pie
      percentage={progress}
      color={currentColor}
      baseColor={isDark ? "#523457" : "#F8F8F8"}
    />
  );
};

export default CircularProgress;
