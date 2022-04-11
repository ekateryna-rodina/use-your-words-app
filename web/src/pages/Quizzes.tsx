import React from "react";
import { useAppSelector } from "../app/hooks";
import { MobileMenu } from "../components/MobileMenu";
import Modal from "../components/Modal/Modal";
import { Overlay } from "../components/Overlay";
import { QuizSection } from "../components/QuizSection";
import { QuizzesHeader } from "../components/QuizzesHeader";
import { Quiz } from "../types";

const Quizzes: React.FC = (props) => {
  const { quizzes } = useAppSelector((state) => state.quizzes);
  return (
    <div className="h-full relative bg-white dark:bg-dark-800">
      <QuizzesHeader />

      <div className="quizzes-container">
        {quizzes.map((q: Quiz, index) => (
          <div key={q.quizId}>
            <QuizSection
              {...q}
              buttonPosition={(index + 1) % 2 === 0 ? "right" : "left"}
              withDivider={index === quizzes.length - 1 ? false : true}
            />
            <div className="border-x-8 border-gray-300" />
          </div>
        ))}
      </div>

      <MobileMenu />
      <Overlay />
      <Modal />
    </div>
  );
};

export default Quizzes;
