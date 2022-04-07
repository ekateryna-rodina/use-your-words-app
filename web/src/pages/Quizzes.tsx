import React from "react";
import { MobileMenu } from "../components/MobileMenu";
import { QuizzesHeader } from "../components/QuizzesHeader";

const Quizzes: React.FC = (props) => {
  return (
    <div className="h-full relative bg-white dark:bg-dark-800">
      <QuizzesHeader />
      <MobileMenu />
    </div>
  );
};

export default Quizzes;
