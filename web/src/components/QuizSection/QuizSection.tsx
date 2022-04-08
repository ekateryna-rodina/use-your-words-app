import React from "react";
import { Quiz } from "../../types";
import QuizRing from "../QuizRing.style";
import { QuizWordsSection } from "../QuizWordsSection";
import { SuccessLevel } from "../SuccessLevel";

type QuizSectionProps = Quiz & {
  buttonPosition: "left" | "right";
};
const QuizSection = ({
  quizId,
  quizNumber,
  words,
  isEnabled,
  successLevel,
  buttonPosition,
}: QuizSectionProps) => {
  const buttonOrder = buttonPosition === "right" ? "order-1" : "order-2";
  const wordsOrder = buttonPosition === "right" ? "order-2" : "order-1";
  const successLevelPosition =
    buttonPosition === "right" ? "left-0" : "right-0";
  const space = buttonPosition === "right" ? "ml-8" : "mr-8";
  return (
    <div className="w-5/6 mx-auto flex flex-row justify-center items-center py-4 border-b-[1px] border-gray-300">
      <div className={`flex-2 ${wordsOrder} ${space}`}>
        <QuizWordsSection words={words} />
      </div>
      <div className={`relative flex-1 ${buttonOrder}`}>
        <QuizRing
          color={buttonPosition === "right" ? "purple" : "green"}
          size="lg"
          contentText={`Byte ${quizNumber}`}
          styleClass="m-auto"
        />
        <div className={`absolute -bottom-6 ${successLevelPosition}`}>
          <SuccessLevel level={successLevel} />
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
