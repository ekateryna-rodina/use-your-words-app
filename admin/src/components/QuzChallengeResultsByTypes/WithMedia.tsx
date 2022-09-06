import React from "react";
import { ChallengesRsultProps } from ".";
import { ChallengesResultCheckbox } from "../ChallengesResultCheckbox";
import { PlaySound } from "../PlaySound";

const WithMedia = ({ title, challenges }: ChallengesRsultProps) => {
  const withAnswer: boolean = challenges.filter((c) => c.answer).length > 0;
  const headers = ["", "Word", "Media"];
  if (withAnswer) headers.push("Answer");
  else headers.push("");
  return (
    <div
      className="quiz-challenges-grid"
      style={{
        gridTemplateColumns: "20px 2fr 1fr 1fr",
      }}
    >
      <div className="quiz-challenges-result-name">{title}</div>
      {headers.map((h, i) => (
        <div key={`${h}_${i}`} className="quiz-challenges-result-header">
          {h}
        </div>
      ))}

      {challenges.map((q) => (
        <React.Fragment key={`${q.wordId}_p`}>
          <ChallengesResultCheckbox type={q.__type} wordId={q.wordId} />
          <div
            className="quiz-challenges-result-word"
            key={`${q.wordId}_word_pronounce`}
          >
            {q.word}
          </div>
          <div
            className="quiz-challenges-result-media"
            key={`${q.wordId}_media_pronounce`}
          >
            <PlaySound fileUrl={q.question as string} />
          </div>
          {withAnswer ? (
            <div className="quiz-challenges-result-answer"> {q.answer}</div>
          ) : (
            <div></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default React.memo(WithMedia);
