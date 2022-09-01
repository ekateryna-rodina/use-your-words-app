import React from "react";
import { QuestionType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import RandomIcon from "../icons/RandomIcon";

const ChooseMeaningByWord = () => {
  const { challenges } = useAppSelector((state) => state.addNewQuiz);
  return (
    <div
      className="grid mb-2"
      style={{
        gridTemplateColumns: "1fr 1fr 3fr 2fr 1fr",
        alignItems: "center",
        gap: "3px",
      }}
    >
      <div className="quiz-challenges-result-name">
        Choose definition by word
      </div>
      <div className="quiz-challenges-result-header">Word</div>
      <div className="quiz-challenges-result-header">Question</div>
      <div className="quiz-challenges-result-header">Options</div>
      <div className="quiz-challenges-result-header">Answer</div>
      <div></div>
      {challenges
        .filter((c) => c.__type === QuestionType.ChooseMeaningByWord)
        .map((q) => (
          <React.Fragment key={`${q.wordId}_cmw`}>
            <div>{q.word}</div>
            <div>{q.question}</div>
            <div className="quiz-challenges-options-cell">
              {q.options?.map((o) => (
                <div key={`${q.wordId}_options_cmw_${o}`}>{o}</div>
              ))}
            </div>
            <div>{q.answer}</div>
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

export default ChooseMeaningByWord;
