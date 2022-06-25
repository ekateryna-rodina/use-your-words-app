import React, { useEffect, useRef, useState } from "react";
import { QuestionType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import { useAnswerResult } from "../../hooks/useAnswerResult";
import { useHint } from "../../hooks/useHint";
import { ChallengeTitles } from "../../types";

type FillGapProps = {
  challengeId: string;
  phrase: string;
  answer: string;
};

const FillGap = ({ challengeId, phrase, answer }: FillGapProps) => {
  const { currentChallengeIndex, currentQuizChallengeIds } = useAppSelector(
    (state) => state.practice
  );
  const [value, setValue] = useState<string>("");
  const hintData = useHint(
    { value, answer, challengeId },
    QuestionType.FillGap
  );
  const isCurrent =
    currentChallengeIndex !== null &&
    challengeId === currentQuizChallengeIds[currentChallengeIndex];
  const ref = useRef<HTMLInputElement | null>(null);
  const regexp = /\[(\S*)\]/g;
  const parts = phrase.split(regexp);
  useAnswerResult({ userAnswer: value, challengeId });
  useEffect(() => {
    if (!hintData) return;
    setValue(hintData as string);
    // ref.current?.focus();
    // eslint-disable-next-line
  }, [hintData, isCurrent]);
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.FillGap]}</h2>
        <div className="leading-8">
          {parts.map((p) =>
            p === answer ? (
              <div key={p} className="relative w-fit h-fit inline">
                <span className="invisible px-4 py-2">{p}</span>
                <input
                  ref={ref}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  className="absolute inset-0 px-2 py-2 h-[1.9rem] -mt-1"
                />
              </div>
            ) : (
              <span className="dark:text-light" key={p}>
                {p}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FillGap;
