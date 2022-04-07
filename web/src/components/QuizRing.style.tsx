import React from "react";

type QuizRingProps = {
  color: "purple" | "green";
  size: "sm" | "lg";
  contentText: string;
};

const SizeMap: Record<"outer" | "inner", Record<"sm" | "lg", string>> = {
  outer: {
    sm: "w-16 h-16",
    lg: "w-32 h-32",
  },
  inner: {
    sm: "w-12 h-12",
    lg: "w-28 h-28",
  },
};
const BgColorMap: Record<"purple" | "green", string> = {
  purple: "bg-purple",
  green: "bg-green",
};

const QuizRing = ({ color, size, contentText }: QuizRingProps) => {
  const outerSize = SizeMap["outer"][size];
  const innerSize = SizeMap["inner"][size];
  const bgColor = BgColorMap[color];
  return (
    <div className={`relative rounded-full ${bgColor} ${outerSize}`}>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-200 ${innerSize}`}
      ></div>
    </div>
  );
};

export default QuizRing;
