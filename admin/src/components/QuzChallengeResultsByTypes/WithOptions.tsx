import React from "react";
import { ChallengesRsultProps } from ".";

import { ChallengesResultCheckbox } from "../ChallengesResultCheckbox";
import { RegenerateChallengeButton } from "../RegenerateChallengeButton";

const WithOptions = ({ challenges, title }: ChallengesRsultProps) => {
  const headers = ["", "Word", "Question", "Options", "Answer", ""];
  return (
    <div
      className="quiz-challenges-grid"
      style={{
        gridTemplateColumns: "20px 1fr 1fr 2fr 1fr 50px",
      }}
    >
      <div className="quiz-challenges-result-name">{title}</div>
      {headers.map((h, i) => (
        <div key={`${h}_${i}`} className="quiz-challenges-result-header">
          {h}
        </div>
      ))}
      {challenges.map((q) => (
        <React.Fragment key={`${q.wordId}_csw_${q.question}`}>
          <ChallengesResultCheckbox type={q.__type} wordId={q.wordId} />
          <div className="quiz-challenges-result-word">{q.word}</div>
          <div className="quiz-challenges-result-question">{q.question}</div>
          <div className="quiz-challenges-options-cell">
            {q.options?.map((o) => (
              <div key={`${q.wordId}_csw_o_${o}`}>{o}</div>
            ))}
          </div>
          <div className="quiz-challenges-result-answer">{q.answer}</div>
          <RegenerateChallengeButton
            type={q.__type}
            word={q.word as string}
            wordId={q.wordId}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default React.memo(WithOptions);
