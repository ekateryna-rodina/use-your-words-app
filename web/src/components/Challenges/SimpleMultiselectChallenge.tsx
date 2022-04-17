import React from "react";
import { ChallengeTitles } from "../../types";
import SimpleMultiselect from "./SimpleMultiselect";

type SimpleMultiselectChallengeProps = {
  title: keyof typeof ChallengeTitles;
  question: string;
  answer: string;
  options: string[];
};
const SimpleMultiselectChallenge = ({
  title,
  question,
  answer,
  options,
}: SimpleMultiselectChallengeProps) => {
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[title]}</h2>
        <div className="challenge__question">
          <div className="mb-4 dark:text-light">{question}</div>
          <SimpleMultiselect options={options} correctAnswer={answer} />
        </div>
      </div>
    </div>
  );
};

export default SimpleMultiselectChallenge;
