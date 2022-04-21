import React, { useState } from "react";
import Option from "./Option";

type SimpleMultiselectProps = {
  options: string[];
  answer: string;
  hintOptions: string[];
};

const SimpleMultiselect = ({
  options,
  answer,
  hintOptions,
}: SimpleMultiselectProps) => {
  const [userAnswer, setUserAnswer] = useState<string>("");
  return (
    <div className="flex flex-col justify-center items-center gap-2 my-2 ease-in-out duration-200">
      {options.map((o) => (
        <Option
          key={o}
          option={o}
          setUserAnswer={setUserAnswer}
          userAnswer={userAnswer}
          hintOptions={hintOptions}
        />
      ))}
    </div>
  );
};

export default SimpleMultiselect;
