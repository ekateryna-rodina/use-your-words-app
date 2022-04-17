import React from "react";
import { QuestionType } from "use-your-words-common";
import { ChallengeTitles } from "../../types";
import { PlaySound } from "../PlaySound";
import LetterInput from "./LetterInput";

type TypeWordByPronunciationProps = {
  fileUrl: string;
  answer: string;
};
const TypeWordByPronunciation = ({
  fileUrl,
  answer,
}: TypeWordByPronunciationProps) => {
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.TypeWordByPronunciation]}</h2>
        <div className="challenge__question flex justify-center items-center">
          <PlaySound fileUrl={fileUrl} />
        </div>
        <div className="challenge_answer">
          <LetterInput answer={answer} />
        </div>
      </div>
    </div>
  );
};

export default TypeWordByPronunciation;
