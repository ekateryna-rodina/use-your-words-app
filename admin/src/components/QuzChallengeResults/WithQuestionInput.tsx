import React from "react";
import { ChallengesRsultProps } from ".";
import { ChallengesResultCheckbox } from "../ChallengesResultCheckbox";
import RandomIcon from "../icons/RandomIcon";

const WithQuestionInput = ({ challenges, title }: ChallengesRsultProps) => {
  const headers = ["", "Word", "Question", "Answer", ""];
  return (
    <div
      className="quiz-challenges-grid"
      style={{
        gridTemplateColumns: "20px 1fr 2fr 1fr 50px",
      }}
    >
      <div className="quiz-challenges-result-name">{title}</div>
      {headers.map((h, i) => (
        <div key={`${h}_${i}`} className="quiz-challenges-result-header">
          {h}
        </div>
      ))}
      {challenges.map((q) => (
        <React.Fragment key={`${q.wordId}_twm`}>
          <ChallengesResultCheckbox type={q.__type} wordId={q.wordId} />
          <div className="quiz-challenges-result-word">{q.word}</div>
          <div className="quiz-challenges-result-question">{q.question}</div>
          <div className="quiz-challenges-result-answer">{q.answer}</div>
          <div>
            <button className="btn generate">
              <RandomIcon />
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default WithQuestionInput;
