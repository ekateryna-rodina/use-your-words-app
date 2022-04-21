import React, { useState } from "react";
import Option from "./Option";

type CarouselMultiselectProps = {
  options: string[];
  correctAnswer: string;
  hintOptions: string[];
};

const CarouselMultiselect = ({
  options,
  correctAnswer,
  hintOptions,
}: CarouselMultiselectProps) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const flexButtons = `${
    currentIdx > 0 && currentIdx < options.length - 1
      ? "justify-between"
      : currentIdx > 0
      ? "justify-start"
      : "justify-end"
  }`;
  return (
    <>
      <div className="relative">
        {options.map((o, i) => (
          <Option
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
      <div className="absolute bottom-1/3 left-0 right-0 ">
        <div
          className={`w-11/12 mx-auto px-4 flex flex-row ${flexButtons} items-center`}
        >
          {currentIdx > 0 ? (
            <button
              className="multiselect__button"
              onClick={() => setCurrentIdx(currentIdx - 1)}
            >
              Previous
            </button>
          ) : (
            <></>
          )}
          {currentIdx < options.length - 1 ? (
            <button
              className="multiselect__button"
              onClick={() => setCurrentIdx(currentIdx + 1)}
            >
              Next
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default CarouselMultiselect;
