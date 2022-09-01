import { QuestionType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import RandomIcon from "../icons/RandomIcon";

const FindWordMeaningPair = () => {
  const { challenges } = useAppSelector((state) => state.addNewQuiz);
  console.log(challenges);
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
          <>
            <div className="quiz-challenges-options-cell green flex-wrap">
              {(q.question as { words: string[]; meanings: string[] })[
                "words"
              ].map((w) => (
                <div>{w}</div>
              ))}
            </div>
            <div className="quiz-challenges-options-cell pink">
              {(q.question as { words: string[]; meanings: string[] })[
                "meanings"
              ].map((m) => (
                <div>{m}</div>
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
                <>
                  <div className="p-2 border-[1px] border-emerald-300/50">
                    {k}
                  </div>
                  <span>-</span>
                  <div className="border-[1px] border-violet-300/50 p-2">
                    {(q.answer as Record<string, string>)[k]}
                  </div>
                </>
              ))}
            </div>
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

export default FindWordMeaningPair;
