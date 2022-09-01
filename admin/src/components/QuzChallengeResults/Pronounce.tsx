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
          <>
            <div>{q.word}</div>
            <div>
              <PlaySound fileUrl={q.question as string} />
            </div>
            <div></div>
          </>
        ))}
    </div>
  );
};

export default Pronounce;
