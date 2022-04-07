import React from "react";
import QuizRing from "../QuizRing.style";
import { Switcher } from "../Switcher";

const QuizzesHeader = () => {
  return (
    <div>
      <QuizRing color="purple" size="sm" contentText="1/325" />
      <Switcher />
    </div>
  );
};

export default QuizzesHeader;
