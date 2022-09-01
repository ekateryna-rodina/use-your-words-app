import React from "react";
import { QuestionType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import RandomIcon from "../icons/RandomIcon";

const FindWordMeaningPair = () => {
  const { challenges } = useAppSelector((state) => state.addNewQuiz);
  return (
    <div
      className="grid mb-2"
      style={{
        gridTemplateColumns: "1fr 3fr 4fr 1fr",
        alignItems: "center",
        rowGap: "7px",
        columnGap: "5px",
      }}
    >
      <div className="quiz-challenges-result-name">
        Connect words with definitions
      </div>
      <div className="quiz-challenges-result-header">Word options</div>
      <div className="quiz-challenges-result-header">Definition options</div>
      <div className="quiz-challenges-result-header">Answer</div>
      <div></div>
      {challenges
        .filter((c) => c.__type === QuestionType.ConnectWordsWithMeanings)
        .map((q) => (
          <React.Fragment key={`${q.wordId}_fp`}>
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

export default FindWordMeaningPair;
