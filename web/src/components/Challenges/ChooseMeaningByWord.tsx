import React, { useEffect, useState } from "react";
import { QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setHint,
  setHintIsAvailable,
} from "../../features/practiceActions/practiceactions-slice";
import { ChallengeTitles } from "../../types";
import { getDisabledOptions } from "../../utils/challenges";
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
        <h2>{ChallengeTitles[QuestionType.ChooseMeaningByWord]}</h2>
        <div className="challenge__question">
          <div className="text-center mb-4 uppercase dark:text-light">
            {question}
          </div>
          <CarouselMultiselect
            options={options}
            correctAnswer={answer}
            hintOptions={hintOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseMeaningByWord;
