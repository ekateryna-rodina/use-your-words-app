import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Quiz } from "../../types";
import { CircularProgressWithText } from "../CircularProgressWithText";
import LearnIcon from "../icons/LearnIcon";
import PracticeIcon from "../icons/PracticeIcon";
import { QuizWordsSection } from "../QuizWordsSection";
import SquareButton from "../SquareButton.style";
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
  const border = withDivider
    ? " border-b-[1px] border-gray-300 border-opacity-30 dark:border-opacity-10"
    : "";
  const { isDark } = useAppSelector((state) => state.theme);
  return (
    <div
      className={`w-5/6 mx-auto flex flex-row justify-center items-center py-4 ${border}`}
    >
      <div className={`relative flex-2 ${wordsOrder}`}>
        <QuizWordsSection words={words} />
      </div>
      <div className={`relative flex-1 ${buttonOrder}`}>
        <CircularProgressWithText
          progress={15}
          text={`Byte ${quizNumber}`}
          size="lg"
        />
        <div className="flex justify-center items-center gap-2">
          <SquareButton handler={() => null} isPrimary={false}>
            <LearnIcon fill={isDark ? "fill-light" : "fill-gray-300"} />
          </SquareButton>
          <SquareButton handler={() => null} isPrimary={true}>
            <PracticeIcon fill="fill-light" />
          </SquareButton>
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
