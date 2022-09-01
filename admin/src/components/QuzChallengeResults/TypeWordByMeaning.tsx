import React from "react";
import { QuestionType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";

const TypeWordByMeaning = () => {
  const { challenges } = useAppSelector((state) => state.addNewQuiz);
  return (
    <div
      className="grid mb-2"
      style={{
        gridTemplateColumns: "2fr 1fr 1fr",
        alignItems: "center",
        gap: "3px",
      }}
    >
      <div className="quiz-challenges-result-name">
        Type word by the definition
      </div>
      <div className="quiz-challenges-result-header">Word</div>
      <div className="quiz-challenges-result-header">Question</div>
      <div className="quiz-challenges-result-header">Answer</div>
      {challenges
        .filter((c) => c.__type === QuestionType.TypeWordByMeaning)
        .map((q) => (
          <React.Fragment key={`${q.wordId}_twm`}>
            <div>{q.word}</div>
            <div>{q.question}</div>
            <div>{q.answer}</div>
          </React.Fragment>
        ))}
    </div>
  );
};

export default TypeWordByMeaning;
