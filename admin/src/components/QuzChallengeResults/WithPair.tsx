import React from "react";
import { QuestionType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import { ChallengesResultCheckbox } from "../ChallengesResultCheckbox";
import RandomIcon from "../icons/RandomIcon";

const WithPair = () => {
  const { challenges } = useAppSelector((state) => state.addNewQuiz);
  const headers = ["", "Word options", "Definition options", "Answer", ""];
  return (
    <div
      className="quiz-challenges-grid"
      style={{
        gridTemplateColumns: "20px 1fr 2fr 4fr 1fr",
      }}
    >
      <div className="quiz-challenges-result-name">
        Connect words with definitions
      </div>
      {headers.map((h, i) => (
        <div key={`${h}_${i}`} className="quiz-challenges-result-header">
          {h}
        </div>
      ))}
      {challenges
        .filter((c) => c.__type === QuestionType.ConnectWordsWithMeanings)
        .map((q) => (
          <React.Fragment key={`${q.wordId}_fp`}>
            <ChallengesResultCheckbox type={q.__type} wordId={q.wordId} />
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

export default WithPair;
