import React, { useEffect, useState } from "react";
import { QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setHint,
  setHintIsAvailable,
} from "../../features/practiceActions/practiceactions-slice";
import { ChallengeTitles } from "../../types";
import { getValueWithHint } from "../../utils/challenges";
import { PlaySound } from "../PlaySound";
import LetterInput from "./LetterInput";

type TypeWordByPronunciationProps = {
  fileUrl: string;
  answer: string;
  challengeId: string;
  transcription: string;
};
const TypeWordByPronunciation = ({
  fileUrl,
  answer,
  challengeId,
  transcription,
}: TypeWordByPronunciationProps) => {
  const { isHint } = useAppSelector((state) => state.practiceActions);
  const { currentChallengeIndex, currentQuizChallengeIds } = useAppSelector(
    (state) => state.practice
  );
  const [showTranscription, setShowTrancription] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isCurrent =
    currentChallengeIndex !== null &&
    challengeId === currentQuizChallengeIds[currentChallengeIndex];
  const [userAnswer, setUserAnswer] = useState<string[]>(
    answer.split("").map((l) => "")
  );
  const resetHint = () => {
    dispatch(setHintIsAvailable(false));
    dispatch(setHint(false));
  };
  useEffect(() => {
    if (isCurrent && isHint) {
      const valueWithHint = getValueWithHint(answer, userAnswer.join(""));
      console.log(answer, userAnswer.join(""), valueWithHint);
      setUserAnswer(
        Array(answer.length)
          .fill("")
          .map((l, i) => valueWithHint[i] ?? "")
      );
      setShowTrancription(true);
      resetHint();
    }
    // eslint-disable-next-line
  }, [isCurrent, isHint]);
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.TypeWordByPronunciation]}</h2>
        <div className="challenge__question flex justify-center items-center">
          <PlaySound fileUrl={fileUrl} />
        </div>
        <div className="challenge_answer">
          <LetterInput {...{ answer, userAnswer, setUserAnswer }} />
          {showTranscription ? (
            <div className="transcription">{transcription}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeWordByPronunciation;
