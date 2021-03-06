import React from "react";
import { FillColor, SuccessLevels } from "../../types";
import StarIcon from "../icons/StarIcon";

type SuccessLevelProps = {
  level: SuccessLevels;
  score?: number;
};
const ColorMap: Record<SuccessLevels, FillColor | [FillColor, FillColor]> = {
  [SuccessLevels.Novice]: "fill-gray-300",
  [SuccessLevels.FromNoviceToImproved]: ["fill-gray-300", "fill-yellow"],
  [SuccessLevels.Improved]: "fill-yellow",
  [SuccessLevels.FromImprovedToMaster]: ["fill-yellow", "fill-green"],
  [SuccessLevels.Master]: "fill-green",
};
const SuccessLevel = ({ level, score }: SuccessLevelProps) => {
  return (
    <div className="icon-with-score-container">
      <StarIcon fill={ColorMap[level]} />
      {score ? <span>{score}</span> : <></>}
    </div>
  );
};

export default SuccessLevel;
