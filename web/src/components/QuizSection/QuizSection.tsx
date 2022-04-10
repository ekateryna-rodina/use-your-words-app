import React from "react";
import { Quiz } from "../../types";
import { CircularProgress } from "../CircularProgress";
import { QuizActionModal } from "../QuizActionModal";
import { QuizWordsSection } from "../QuizWordsSection";
type QuizSectionProps = Quiz & {
  buttonPosition: "left" | "right";
  withDivider: boolean;
};
const QuizSection = ({
  quizId,
  quizNumber,
  words,
  isEnabled,
  successLevel,
  buttonPosition,
  withDivider,
}: QuizSectionProps) => {
  const buttonOrder = buttonPosition === "right" ? "order-1" : "order-2";
  const wordsOrder = buttonPosition === "right" ? "order-2" : "order-1";
  // const successLevelPosition =
  //   buttonPosition === "right" ? "left-0" : "right-0";
  const space = buttonPosition === "right" ? "ml-8" : "mr-8";
  const border = withDivider
    ? " border-b-[1px] border-gray-300 border-opacity-30 dark:border-opacity-10"
    : "";
  return (
    <div
      className={`w-5/6 mx-auto flex flex-row justify-center items-center py-4 ${border}`}
    >
      <div className={`relative flex-2 ${wordsOrder} ${space}`}>
        <QuizWordsSection words={words} />
        <QuizActionModal quizId={quizId} />
      </div>
      <div className={`relative flex-1 ${buttonOrder}`}>
        <CircularProgress progress={33} />
        {/* <QuizRingWithProgress
          color={buttonPosition === "right" ? "purple" : "green"}
          size="lg"
          contentText={`Byte ${quizNumber}`}
          styleClass="m-auto"
          clickedId={quizId}
        /> */}

        {/* <div className={`absolute -bottom-6 ${successLevelPosition}`}>
          <SuccessLevel level={successLevel} />
        </div> */}
      </div>
    </div>
  );
};

export default QuizSection;
