import React, { useState } from "react";
import { QuestionType } from "use-your-words-common";
import { ChallengeTitles } from "../../types";
import LetterInput from "./LetterInput";

type TypeWordByMeaningProps = {
  meaning: string;
  answer: string;
};

const TypeWordByMeaning = ({ meaning, answer }: TypeWordByMeaningProps) => {
  const [userAnswer, setUserAnswer] = useState<string[]>(
    answer.split("").map((l) => "")
  );
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.TypeWordByMeaning]}</h2>
        <div className="challenge__question flex justify-start items-center">
          {meaning}
        </div>
        <div className="challenge_answer">
          <LetterInput {...{ userAnswer, setUserAnswer, answer }} />
        </div>
      </div>
    </div>
  );
};

export default TypeWordByMeaning;
