import React, { useEffect, useState } from "react";
import { QuestionType } from "use-your-words-common";
import { useHint } from "../../hooks/useHint";
import { ChallengeTitles } from "../../types";
import LetterInput from "./LetterInput";

type TypeWordByMeaningProps = {
  meaning: string;
  answer: string;
  challengeId: string;
};

const TypeWordByMeaning = ({
  meaning,
  answer,
  challengeId,
}: TypeWordByMeaningProps) => {
  const [userAnswer, setUserAnswer] = useState<string[]>(
    answer.split("").map((l) => "")
  );
  const hintData = useHint(
    { answer, value: userAnswer.join(""), challengeId },
    QuestionType.TypeWordByPronunciation
  );
  useEffect(() => {
    if (!hintData) return;
    setUserAnswer(
      Array(answer.length)
        .fill("")
        .map((l, i) => hintData[i] ?? "")
    );
    // eslint-disable-next-line
  }, [hintData]);
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.TypeWordByMeaning]}</h2>
        <div className="challenge__question flex justify-start items-center">
          {meaning}
        </div>
        <div className="challenge_answer">
          <LetterInput
            {...{ userAnswer, setUserAnswer, answer, challengeId }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypeWordByMeaning;
