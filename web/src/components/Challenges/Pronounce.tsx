import React, { useEffect, useState } from "react";
import { QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setHint,
  setHintIsAvailable,
} from "../../features/practiceActions/practiceactions-slice";
import { ChallengeTitles } from "../../types";
import { PlaySound } from "../PlaySound";

type PronounceProps = {
  fileUrl: string;
  challengeId: string;
  transcription: string;
  word: string;
};
const Pronounce = ({
  fileUrl,
  challengeId,
  transcription,
  word,
}: PronounceProps) => {
  const { isHint } = useAppSelector((state) => state.practiceActions);
  const { currentChallengeIndex, currentQuizChallengeIds } = useAppSelector(
    (state) => state.practice
  );
  const [transcriptionHint, setTranscriptionHint] = useState<string>("");
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
      setTranscriptionHint(transcription);
      resetHint();
    }
    // eslint-disable-next-line
  }, [isCurrent, isHint]);
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.Pronounce]}</h2>
        <div className="challenge__question flex justify-center items-center dark:text-light">
          {word}
        </div>
        {transcriptionHint ? (
          <div className="transcription">
            <PlaySound fileUrl={fileUrl} />
            {transcription}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Pronounce;
