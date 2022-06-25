import React, { useEffect, useState } from "react";
import { QuestionType } from "use-your-words-common";
import { useAnswerResult } from "../../hooks/useAnswerResult";
import { useHint } from "../../hooks/useHint";
import { ChallengeTitles } from "../../types";
import CarouselMultiselect from "./CarouselMultiselect";

type ChooseMeaningByWordProps = {
  question: string;
  answer: string;
  options: string[];
  challengeId: string;
};

const ChooseMeaningByWord = ({
  question,
  answer,
  options,
  challengeId,
}: ChooseMeaningByWordProps) => {
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
        <h2>{ChallengeTitles[QuestionType.ChooseMeaningByWord]}</h2>
        <div className="challenge__question">
          <div className="text-center mb-4 uppercase dark:text-light">
            {question}
          </div>
          <CarouselMultiselect
            options={options}
            correctAnswer={answer}
            hintOptions={hintOptions}
            challengeId={challengeId}
            {...{ userAnswer, setUserAnswer }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseMeaningByWord;
