import React from "react";
import { QuestionType } from "use-your-words-common";
import { ChallengeTitles } from "../../types";
import CarouselMultiselect from "./CarouselMultiselect";

type ChooseMeaningByWordProps = {
  question: string;
  answer: string;
  options: string[];
};

const ChooseMeaningByWord = ({
  question,
  answer,
  options,
}: ChooseMeaningByWordProps) => {
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.ChooseMeaningByWord]}</h2>
        <div className="challenge__question">
          <div className="text-center mb-4 uppercase dark:text-light">
            {question}
          </div>
          <CarouselMultiselect options={options} correctAnswer={answer} />
        </div>
      </div>
    </div>
  );
};

export default ChooseMeaningByWord;
