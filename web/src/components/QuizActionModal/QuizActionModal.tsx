import React from "react";
import { useAppSelector } from "../../app/hooks";
import { ProgressBar } from "../ProgressBar";

type QuizActionModalProps = {
  quizId: string;
};

const QuizActionModal = ({ quizId }: QuizActionModalProps) => {
  const activeQuizId = useAppSelector((state) => state.activeQuizMenu.quizId);
  return quizId === activeQuizId ? (
    <div className="absolute bg-gray-200 rounded-md inset-0 dark:bg-dark-700">
      <ProgressBar progress={64} />
    </div>
  ) : (
    <></>
  );
};

export default QuizActionModal;
