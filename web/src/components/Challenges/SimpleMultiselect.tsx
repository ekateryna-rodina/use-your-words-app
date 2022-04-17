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
  const [userAnswer, setUserAnswer] = useState<string>("");
  return (
    <div className="flex flex-col justify-center items-center gap-2 my-2 ease-in-out duration-200">
      {options.map((o) => (
        <Option
          option={o}
          setUserAnswer={setUserAnswer}
          userAnswer={userAnswer}
        />
      ))}
    </div>
  );
};

export default SimpleMultiselect;
