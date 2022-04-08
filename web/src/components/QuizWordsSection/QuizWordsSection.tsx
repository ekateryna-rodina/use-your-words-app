import React from "react";
import QuizWord from "../QuizWord.style";

type QuizWordsSectionProps = {
  words: string[];
};
const QuizWordsSection = ({ words }: QuizWordsSectionProps) => {
  return (
    <>
      <h6 className="text-sm mb-4 text-center text-gray-300 dark:text-light">
        Words to learn
      </h6>
      <div className="flex flex-wrap gap-2 justify-center">
        {words.map((w) => (
          <QuizWord>{w}</QuizWord>
        ))}
      </div>
    </>
  );
};

export default QuizWordsSection;
