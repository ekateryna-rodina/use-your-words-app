import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { setActiveQuizMenu } from "../../features/activeQuizMenu/activequizmenu-slice";
import QuizRing from "../QuizRing.style";

type QuizRingButtonProps = {
  clickedId: string;
  color: "purple" | "green";
  size: "sm" | "lg";
  contentText: string;
  styleClass?: string;
};
const QuizRingWithProgress = ({
  color,
  size,
  contentText,
  styleClass,
  clickedId,
}: QuizRingButtonProps) => {
  const dispatch = useAppDispatch();
  const setActiveQuizMenuHandler = () => {
    dispatch(setActiveQuizMenu(clickedId));
  };

  return (
    <div className="rounded-full" onClick={setActiveQuizMenuHandler}>
      <QuizRing {...{ color, size, contentText, styleClass }} />
    </div>
  );
};

export default QuizRingWithProgress;
