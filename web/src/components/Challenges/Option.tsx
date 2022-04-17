import React from "react";

type OptionProps = {
  option: string;
  styles?: string;
  setUserAnswer: (answer: string) => void;
  userAnswer: string;
};
const Option = ({ option, setUserAnswer, styles, userAnswer }: OptionProps) => {
  return (
    <div
      onClick={() => setUserAnswer(option)}
      className={`w-full leading-6 rounded-md py-1 px-2 text-sm 
      text-dark bg-gray-200 cursor-pointer 
      dark:bg-dark-700 dark:text-light ${styles} ${
        userAnswer === option ? "bg-purple text-light" : ""
      }`}
    >
      {option}
    </div>
  );
};

export default Option;
