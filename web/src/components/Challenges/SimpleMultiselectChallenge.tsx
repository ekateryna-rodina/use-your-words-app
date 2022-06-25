import React, { useEffect, useState } from "react";
import { QuestionType } from "use-your-words-common";
import { useAnswerResult } from "../../hooks/useAnswerResult";
import { useHint } from "../../hooks/useHint";
import { ChallengeTitles } from "../../types";
import SimpleMultiselect from "./SimpleMultiselect";

type SimpleMultiselectChallengeProps = {
  title: keyof typeof ChallengeTitles;
  question: string;
  answer: string;
  options: string[];
  challengeId: string;
};
const SimpleMultiselectChallenge = ({
  title,
  question,
  answer,
  options,
  challengeId,
}: SimpleMultiselectChallengeProps) => {
  const [hintOptions, setHintOptions] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const hintData = useHint(
    { answer, options, challengeId },
    QuestionType.ChooseMeaningByWord
  );
  useAnswerResult({ userAnswer, challengeId });
  useEffect(() => {
    if (!hintData) return;
    setHintOptions(hintData as string[]);
    // eslint-disable-next-line
  }, [hintData]);
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[title]}</h2>
        <div className="challenge__question">
          <div className="mb-4 dark:text-light text-center">{question}</div>
          <SimpleMultiselect
            {...{ options, answer, hintOptions, userAnswer, setUserAnswer }}
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleMultiselectChallenge;
