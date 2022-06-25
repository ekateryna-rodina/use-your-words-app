import React, { useEffect, useState } from "react";
import { QuestionType } from "use-your-words-common";
import { useAnswerResult } from "../../hooks/useAnswerResult";
import { useHint } from "../../hooks/useHint";
import { ChallengeTitles } from "../../types";
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
  const [showTranscription, setShowTrancription] = useState<boolean>(false);

  const [userAnswer, setUserAnswer] = useState<string[]>(
    answer.split("").map((l) => "")
  );
  useAnswerResult({ userAnswer: userAnswer.join(""), challengeId });
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
    setShowTrancription(true);

    // eslint-disable-next-line
  }, [hintData]);
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.TypeWordByPronunciation]}</h2>
        <div className="challenge__question flex justify-center items-center">
          <PlaySound fileUrl={fileUrl} />
        </div>
        <div className="challenge_answer">
          <LetterInput
            {...{ answer, userAnswer, setUserAnswer, challengeId }}
          />
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
