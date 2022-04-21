import React from "react";

type OptionProps = {
  option: string;
  styles?: string;
  setUserAnswer: (answer: string) => void;
  userAnswer: string;
  hintOptions: string[];
};
const Option = ({
  option,
  setUserAnswer,
  styles,
  userAnswer,
  hintOptions,
}: OptionProps) => {
  const disabled = `${
    hintOptions.includes(option)
      ? "pointer-events-none bg-gray-200 text-gray-300 dark:bg-transparent dark:border-dark-600 dark:text-dark-700"
      : "pointer-events-auto"
  }`;
  return (
    <div
      onClick={() => setUserAnswer(option)}
      className={`w-full leading-6 rounded-md py-1 px-2 text-sm 
      text-dark bg-gray-200 border border-transparent cursor-pointer 
      dark:bg-dark-700 dark:text-light ${disabled} ${styles} ${
        userAnswer === option ? "bg-purple text-light" : ""
      }`}
    >
      {option}
    </div>
  );
};

export default Option;
