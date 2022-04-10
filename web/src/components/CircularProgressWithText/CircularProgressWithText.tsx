import React from "react";
import { useAppSelector } from "../../app/hooks";

type Size = "sm" | "lg";
type CircleProps = {
  color: string;
  percentage?: number;
  size: Size;
};
type TextProps = {
  text: string;
  size: Size;
};
type PieProps = {
  percentage: number;
  color: string;
  baseColor: string;
  text: string;
  size: Size;
};
type CircularProgressWithTextProps = {
  progress: number;
  text: string;
  size: Size;
};

const SizeMap: Record<
  "sm" | "lg",
  { p: number; strokeWidth: number; font: number }
> = {
  sm: {
    p: 33,
    strokeWidth: 0.2,
    font: 0.6,
  },
  lg: {
    p: 100,
    strokeWidth: 0.5,
    font: 1,
  },
};
const cleanPercentage = (percentage: number) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0;
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};
const Circle = ({ color, percentage, size }: CircleProps) => {
  const p = SizeMap[size as keyof typeof SizeMap]["p"];
  const strokeWidth = SizeMap[size as keyof typeof SizeMap]["strokeWidth"];
  const r = p / 2 - p * 0.1;
  const circ = 2 * Math.PI * r;
  const strokePct = ((102 - (percentage ?? 0)) * circ) / 102; // workaround for strokeLinecap round overlap
  return (
    <circle
      r={r}
      cx={p / 2}
      cy={p / 2}
      fill="transparent"
      stroke={strokePct !== circ ? color : ""}
      strokeWidth={`${strokeWidth}rem`}
      strokeLinecap="round"
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    ></circle>
  );
};

const Text = ({ text, size }: TextProps) => {
  const { isDark } = useAppSelector((state) => state.theme);
  return (
    <text
      x="50%"
      y="50%"
      fill={isDark ? "#FEF4FF" : "#523457"}
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={`${SizeMap[size as keyof typeof SizeMap].font}em`}
    >
      {text}
    </text>
  );
};

const Pie = ({ percentage, color, baseColor, text, size }: PieProps) => {
  const pct = cleanPercentage(percentage);
  const p = SizeMap[size as keyof typeof SizeMap]["p"];
  return (
    <svg width={p} height={p}>
      <g transform={`rotate(-90 ${`${p / 2} ${p / 2}`})`}>
        <Circle color={baseColor} percentage={100} size={size} />
        <Circle color={color} percentage={pct} size={size} />
      </g>
      <Text text={text} size={size} />
    </svg>
  );
};

const CircularProgressWithText = ({
  progress,
  text,
  size,
}: CircularProgressWithTextProps) => {
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
      text={text}
      size={size}
    />
  );
};

export default CircularProgressWithText;
