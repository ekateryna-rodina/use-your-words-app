import React from "react";
import { QuestionType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import { PlaySound } from "../PlaySound";

const TypeByPronunciation = () => {
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
      <div className="quiz-challenges-result-name">Type what you heard</div>
      <div className="quiz-challenges-result-header">Word</div>
      <div className="quiz-challenges-result-header">Media</div>
      <div className="quiz-challenges-result-header">Answer</div>
      {challenges
        .filter((c) => c.__type === QuestionType.TypeWordByPronunciation)
        .map((q) => (
          <React.Fragment key={`${q.wordId}_tp`}>
            <div>{q.word}</div>
            <div>
              <PlaySound fileUrl={q.question as string} />
            </div>
            <div>{q.answer}</div>
          </React.Fragment>
        ))}
    </div>
  );
};

export default TypeByPronunciation;
