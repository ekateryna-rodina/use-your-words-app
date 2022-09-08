import React from "react";
import { ChallengesRsultProps } from ".";
import { ChallengesResultCheckbox } from "../ChallengesResultCheckbox";
import { RegenerateChallengeButton } from "../RegenerateChallengeButton";

const WithPair = ({ challenges, title, isEditable }: ChallengesRsultProps) => {
  console.log("her", challenges);
  const headers = isEditable
    ? ["", "Word options", "Definition options", "Answer", ""]
    : ["Word options", "Definition options", "Answer"];
  return (
    <div
      className="quiz-challenges-grid"
      style={{
        gridTemplateColumns: isEditable
          ? "20px 1fr 2fr 4fr 50px"
          : "1fr 2fr 4fr",
      }}
    >
      <div className="quiz-challenges-result-name">{title}</div>
      {headers.map((h, i) => (
        <div key={`${h}_${i}`} className="quiz-challenges-result-header">
          {h}
        </div>
      ))}
      {challenges.map((q) => (
        <React.Fragment key={`${q.wordId}_fp`}>
          {isEditable ? (
            <ChallengesResultCheckbox type={q.__type} wordId={q.wordId} />
          ) : (
            <></>
          )}
          <div className="quiz-challenges-options-cell green flex-wrap">
            {(q.question as { words: string[]; meanings: string[] })[
              "words"
            ].map((w) => (
              <div key={`${q.wordId}_words_fp_${w}`}>{w}</div>
            ))}
          </div>
          <div className="quiz-challenges-options-cell pink">
            {(q.question as { words: string[]; meanings: string[] })[
              "meanings"
            ].map((m) => (
              <div key={`${q.wordId}_meanings_fp_${m}`}>{m}</div>
            ))}
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr 10px 4fr",
              alignItems: "center",
              gap: "3px",
            }}
          >
            {Object.keys(q.answer as {}).map((k) => (
              <React.Fragment key={`${q.wordId}_pair_${k}`}>
                <div className="p-2 border-[1px] border-emerald-300/50">
                  {k}
                </div>
                <span>-</span>
                <div className="border-[1px] border-violet-300/50 p-2">
                  {(q.answer as Record<string, string>)[k]}
                </div>
              </React.Fragment>
            ))}
          </div>
          {isEditable ? (
            <RegenerateChallengeButton
              type={q.__type}
              word={q.word as string}
              wordId={q.wordId}
            />
          ) : (
            <></>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default React.memo(WithPair);
