import React from "react";
import { QuestionType } from "use-your-words-common";
import { ChallengeTitles } from "../../types";
import { PlaySound } from "../PlaySound";

type PronounceProps = {
  fileUrl: string;
};
const Pronounce = ({ fileUrl }: PronounceProps) => {
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.Pronounce]}</h2>
        <div className="challenge__question flex justify-center items-center">
          <PlaySound fileUrl={fileUrl} />
        </div>
      </div>
    </div>
  );
};

export default Pronounce;
