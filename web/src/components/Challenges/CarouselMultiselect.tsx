import React, { useEffect, useState } from "react";
import BackForwardNavigation from "./BackForwardNavigation";
import Option from "./Option";

type CarouselMultiselectProps = {
  options: string[];
  correctAnswer: string;
  hintOptions: string[];
  challengeId: string;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
};
const CarouselMultiselect = ({
  options,
  correctAnswer,
  hintOptions,
  challengeId,
  userAnswer,
  setUserAnswer,
}: CarouselMultiselectProps) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  useEffect(() => {
    setCurrentIdx(0);
  }, [challengeId]);
  return (
    <>
      <div className="relative">
        {options.map((o, i) => (
          <Option
            key={o}
            styles={`absolute transition-transform ease-in-out duration-200 ${
              currentIdx === i
                ? "translate-x-[0%] delay-200"
                : "translate-x-[110%]"
            }`}
            option={options[currentIdx]}
            setUserAnswer={setUserAnswer}
            userAnswer={userAnswer}
            hintOptions={hintOptions}
          />
        ))}
      </div>
      <BackForwardNavigation {...{ currentIdx, setCurrentIdx, challengeId }} />
    </>
  );
};

export default CarouselMultiselect;
