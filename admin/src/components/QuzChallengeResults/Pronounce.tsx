import React from "react";
import { QuestionType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import { PlaySound } from "../PlaySound";

const Pronounce = () => {
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
        Pronunce the word out loud
      </div>
      <div className="quiz-challenges-result-header">Word</div>
      <div className="quiz-challenges-result-header">Media</div>
      <div></div>
      {challenges
        .filter((c) => c.__type === QuestionType.Pronounce)
        .map((q) => (
          <React.Fragment key={`${q.wordId}_p`}>
            <div key={`${q.wordId}_word_pronounce`}>{q.word}</div>
            <div key={`${q.wordId}_media_pronounce`}>
              <PlaySound fileUrl={q.question as string} />
            </div>
            <div key={`${q.wordId}_none_pronounce`}></div>
          </React.Fragment>
        ))}
    </div>
  );
};

export default Pronounce;
