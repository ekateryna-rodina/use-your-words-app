import React from "react";
import { QuestionType } from "use-your-words-common";
import { ChallengeTitles } from "../../types";

type ConnectChallengeType = {
  question: {
    words: string[];
    [k: string]: string[];
  };
  answer: Record<string, string>;
};
const ConnectChallenge = ({ question, answer }: ConnectChallengeType) => {
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.ConnectWordsWithMeanings]}</h2>
        <div className="challenge__question">
          <div className="mb-4 dark:text-light"></div>
        </div>
      </div>
    </div>
  );
};

export default ConnectChallenge;
