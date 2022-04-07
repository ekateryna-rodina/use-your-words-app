import React from "react";
import { SuccessLevels } from "../../types";
import { ActiveDays } from "../ActiveDays";
import QuizRing from "../QuizRing.style";
import { StakeLevel } from "../StakeLevel";
import { SuccessLevel } from "../SuccessLevel";
import { Switcher } from "../Switcher";
import WorldRank from "../WorldRank/WorldRank";

const QuizzesHeader = () => {
  return (
    <>
      <div className="header">
        <QuizRing color="purple" size="sm" contentText="1/325" />
        <ActiveDays />
        <SuccessLevel level={SuccessLevels.FromImprovedToMaster} />
        <WorldRank rank={12} />
        <StakeLevel stake={3} />
      </div>
      <Switcher />
    </>
  );
};

export default QuizzesHeader;
