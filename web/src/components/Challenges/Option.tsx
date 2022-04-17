import React from "react";

type OptionProps = {
  option: string;
  styles?: string;
  onSelect: (answer: string) => void;
};
const Option = ({ option, onSelect, styles }: OptionProps) => {
  return (
    <div
      className={`w-full leading-6 rounded-md py-1 px-2 text-sm text-dark bg-gray-200 cursor-pointer dark:bg-dark-700 dark:text-light ${styles}`}
    >
      {option}
    </div>
  );
};

export default Option;
