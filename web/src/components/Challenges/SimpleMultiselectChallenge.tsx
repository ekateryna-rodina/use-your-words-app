import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setHint,
  setHintIsAvailable,
} from "../../features/practiceActions/practiceactions-slice";
import { ChallengeTitles } from "../../types";
import { getDisabledOptions } from "../../utils/challenges";
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
  const { isHint } = useAppSelector((state) => state.practiceActions);
  const { currentChallengeIndex, currentQuizChallengeIds } = useAppSelector(
    (state) => state.practice
  );
  const [hintOptions, setHintOptions] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const isCurrent =
    currentChallengeIndex !== null &&
    challengeId === currentQuizChallengeIds[currentChallengeIndex];
  const resetHint = () => {
    dispatch(setHintIsAvailable(false));
    dispatch(setHint(false));
  };

  useEffect(() => {
    if (isCurrent && isHint) {
      const disabledOptions = getDisabledOptions(answer, options);
      console.log(disabledOptions);
      setHintOptions(disabledOptions);
      resetHint(); // set isHint available/set is hint to false
    }
    // eslint-disable-next-line
  }, [isCurrent, isHint]);
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[title]}</h2>
        <div className="challenge__question">
          <div className="mb-4 dark:text-light text-center">{question}</div>
          <SimpleMultiselect {...{ options, answer, hintOptions }} />
        </div>
      </div>
    </div>
  );
};

export default SimpleMultiselectChallenge;
