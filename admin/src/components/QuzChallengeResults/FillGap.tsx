import React from "react";
import { QuestionType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import { ChallengesResultCheckbox } from "../ChallengesResultCheckbox";
import RandomIcon from "../icons/RandomIcon";

const FillGap = () => {
  const { challenges } = useAppSelector((state) => state.addNewQuiz);
  return (
    <div
      className="grid mb-2"
      style={{
        gridTemplateColumns: "20px 1fr 3fr 1fr 1fr",
        alignItems: "center",
        rowGap: "5px",
      }}
    >
      <div className="quiz-challenges-result-name">Fill the gap</div>
      <div className="quiz-challenges-result-header"></div>
      <div className="quiz-challenges-result-header">Word</div>
      <div className="quiz-challenges-result-header">Question</div>
      <div className="quiz-challenges-result-header">Answer</div>
      <div></div>
      {challenges
        .filter((c) => c.__type === QuestionType.FillGap)
        .map((q) => (
          <React.Fragment key={`${q.wordId}_fg`}>
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

export default FillGap;
