import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Button } from "../Button";
import CloseIcon from "../icons/CloseIcon";
import { ProgressBar } from "../ProgressBar";

const PracticeHeader = () => {
  const { isDark } = useAppSelector((state) => state.theme);
  const { currentQuizId } = useAppSelector((state) => state.practice);
  const { dailyProgress, quizProgress } = useAppSelector(
    (state) => state.scoring
  );
  const closePracticeHandler = () => {
    // how confirm window
  };
  return (
    <div className="header px-4 gap-4">
      <Button handler={closePracticeHandler}>
        <CloseIcon fill={isDark ? "fill-dark-500" : "fill-gray-300"} />
      </Button>

      <ProgressBar
        progress={Math.ceil(quizProgress[currentQuizId as string]) ?? 0}
        title="Quiz progress"
      />
      <ProgressBar progress={Math.ceil(dailyProgress)} title="Daily progress" />
    </div>
  );
};

export default PracticeHeader;
