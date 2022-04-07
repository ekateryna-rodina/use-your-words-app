import React from "react";
import { QuizzesHeader } from "../components/QuizzesHeader";

const Quizzes: React.FC = (props) => {
  return (
    <div className="h-48 p-4 mx-4 bg-white dark:bg-dark-800">
      <QuizzesHeader />
    </div>
  );
};

export default Quizzes;
