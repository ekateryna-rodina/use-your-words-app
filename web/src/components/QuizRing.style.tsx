import React from "react";

type QuizRingProps = {
  color: "purple" | "green";
  size: "sm" | "lg";
  contentText: string;
  styleClass?: string;
};

const SizeMap: Record<"outer" | "inner", Record<"sm" | "lg", string>> = {
  outer: {
    sm: "w-[36px] h-[36px]",
    lg: "w-[74px] h-[74px]",
  },
  inner: {
    sm: "w-8 h-8",
    lg: "w-[66px] h-[66px]",
  },
};
const BgColorMap: Record<"purple" | "green", string> = {
  purple: "bg-purple",
  green: "bg-green",
};
const TextSizeMap = {
  sm: "text-[8px]",
  lg: "text-[12px]",
};
const QuizRing = ({ color, size, contentText, styleClass }: QuizRingProps) => {
  const outerSize = SizeMap["outer"][size];
  const innerSize = SizeMap["inner"][size];
  const bgColor = BgColorMap[color];
  const textSize = TextSizeMap[size];
  return (
    <div
      className={`relative rounded-full ${bgColor} ${outerSize} ${styleClass}`}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-200 dark:bg-dark-800 ${innerSize}`}
      ></div>
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-dark-800 ${textSize} dark:bg-dark-800 dark:text-light`}
      >
        {contentText}
      </span>
    </div>
  );
};

export default QuizRing;
