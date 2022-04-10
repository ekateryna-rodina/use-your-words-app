import React from "react";
import { useAppSelector } from "../../app/hooks";
import { SuccessLevels } from "../../types";
import { ActiveDays } from "../ActiveDays";
import { CircularProgressWithText } from "../CircularProgressWithText";
import { StakeLevel } from "../StakeLevel";
import { SuccessLevel } from "../SuccessLevel";
import WorldRank from "../WorldRank/WorldRank";

const QuizzesHeader = () => {
  const { total, completed } = useAppSelector((state) => state.quizzes);
  return (
    <div className="header">
      <CircularProgressWithText
        progress={Math.floor((completed * 100) / total)}
        text={`${completed}/${total}`}
        size="sm"
      />
      <ActiveDays />
      <SuccessLevel level={SuccessLevels.FromImprovedToMaster} />
      <WorldRank rank={12} />
      <StakeLevel stake={3} />
    </div>
  );
};

export default QuizzesHeader;
