import { QuestionType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import RandomIcon from "../icons/RandomIcon";

const FillGap = () => {
  const { challenges } = useAppSelector((state) => state.addNewQuiz);
  return (
    <div
      className="grid mb-2"
      style={{
        gridTemplateColumns: "1fr 3fr 1fr 1fr",
        alignItems: "center",
        rowGap: "5px",
      }}
    >
      <div className="quiz-challenges-result-name">Fill the gap</div>
      <div className="quiz-challenges-result-header">Word</div>
      <div className="quiz-challenges-result-header">Question</div>
      <div className="quiz-challenges-result-header">Answer</div>
      <div></div>
      {challenges
        .filter((c) => c.__type === QuestionType.FillGap)
        .map((q) => (
          <>
            <div className="font-bold">{q.word}</div>
            <div>{q.question}</div> <div>{q.answer}</div>
            <div>
              <button className="btn generate">
                <RandomIcon />
              </button>
            </div>
          </>
        ))}
    </div>
  );
};

export default FillGap;
