import React from "react";
import { QuestionType } from "use-your-words-common";
import { ChallengeTitles } from "../../types";

type FillGapProps = {
  phrase: string;
  answer: string;
};

const FillGap = ({ phrase, answer }: FillGapProps) => {
  const regexp = /\[(\S*)\]/g;
  const parts = phrase.split(regexp);
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.FillGap]}</h2>
        <div className="challenge__question">
          {parts.map((p) =>
            p === answer ? (
              <div key={p} className="relative w-fit h-fit inline">
                <span className="invisible px-4 py-2">{p}</span>
                <input
                  type="text"
                  className="absolute inset-0 px-2 py-2 h-[1.9rem] -mt-1"
                />
              </div>
            ) : (
              <span className="dark:text-light" key={p}>
                {p}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FillGap;
