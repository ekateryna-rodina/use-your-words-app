import React, { useEffect, useRef, useState } from "react";
import { QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setHint,
  setHintIsAvailable,
} from "../../features/practiceActions/practiceactions-slice";
import { ChallengeTitles } from "../../types";
import { getValueWithHint } from "../../utils/challenges";

type FillGapProps = {
  challengeId: string;
  phrase: string;
  answer: string;
};

const FillGap = ({ challengeId, phrase, answer }: FillGapProps) => {
  const { isHint } = useAppSelector((state) => state.practiceActions);
  const { currentChallengeIndex, currentQuizChallengeIds } = useAppSelector(
    (state) => state.practice
  );
  const dispatch = useAppDispatch();
  const isCurrent =
    currentChallengeIndex !== null &&
    challengeId === currentQuizChallengeIds[currentChallengeIndex];
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement | null>(null);
  const regexp = /\[(\S*)\]/g;
  const parts = phrase.split(regexp);
  const resetHint = () => {
    dispatch(setHintIsAvailable(false));
    dispatch(setHint(false));
  };
  const setHintValue = () => {
    const newValue = getValueWithHint(answer, value);
    setValue(newValue);
  };
  useEffect(() => {
    if (isCurrent && isHint) {
      setHintValue(); // set a value for input field (first or next letter of an answer)
      resetHint(); // set isHint available/set is hint to false
      ref.current?.focus();
    }
    // eslint-disable-next-line
  }, [isCurrent, isHint]);
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
                  autoFocus
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
