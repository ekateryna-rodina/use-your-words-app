import React from "react";

const QuizWord: React.FC = ({ children }) => {
  return (
    <div className="bg-gray-200 p-1 rounded-md text-dark-800 dark:bg-dark-500 dark:text-light">
      {children}
    </div>
  );
};

export default QuizWord;
