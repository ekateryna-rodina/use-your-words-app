import React, { useState } from "react";
import Option from "./Option";

type SimpleMultiselectProps = {
  options: string[];
  correctAnswer: string;
};

const SimpleMultiselect = ({
  options,
  correctAnswer,
}: SimpleMultiselectProps) => {
  const [userAnswer, setUserAnswer] = useState<string>();
  return (
    <div className="flex flex-col justify-center items-center gap-2 my-2">
      {options.map((o) => (
        <Option option={o} onSelect={setUserAnswer} />
      ))}
    </div>
  );
};

export default SimpleMultiselect;
