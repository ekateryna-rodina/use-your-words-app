import { QuestionType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import RandomIcon from "../icons/RandomIcon";

const ChooseWordByMeaning = () => {
  const { challenges } = useAppSelector((state) => state.addNewQuiz);
  return (
    <div
      className="grid mb-2"
      style={{
        gridTemplateColumns: "2fr 2fr 2fr 1fr 1fr",
        alignItems: "center",
        gap: "3px",
      }}
    >
      <div className="quiz-challenges-result-name">
        Choose word by definition
      </div>
      <div className="quiz-challenges-result-header">Word</div>
      <div className="quiz-challenges-result-header">Question</div>
      <div className="quiz-challenges-result-header">Options</div>
      <div className="quiz-challenges-result-header">Answer</div>
      <div></div>
      {challenges
        .filter((c) => c.__type === QuestionType.ChooseWordByMeaning)
        .map((q) => (
          <>
            <div>{q.word}</div>
            <div>{q.question}</div>
            <div className="quiz-challenges-options-cell">
              {q.options?.map((o) => (
                <div>{o}</div>
              ))}
            </div>
            <div>{q.answer}</div>
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

export default ChooseWordByMeaning;
