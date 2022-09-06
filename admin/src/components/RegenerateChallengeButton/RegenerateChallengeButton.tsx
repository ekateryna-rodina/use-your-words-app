import { useEffect } from "react";
import { QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateSingleChallenge } from "../../features/addNewQuiz/addnewquiz-slice";
import { useLazyRegenerateChallengeQuery } from "../../features/app-api-slice";
import RandomIcon from "../icons/RandomIcon";

type RegenerateChallengeButtonProps = {
  wordId: string;
  type: QuestionType;
  word: string;
};
const RegenerateChallengeButton = ({
  wordId,
  type,
  word,
}: RegenerateChallengeButtonProps) => {
  const { challenges } = useAppSelector((state) => state.addNewQuiz);
  const [regenerate, { data, error }] = useLazyRegenerateChallengeQuery();
  const dispatch = useAppDispatch();
  const regenerateHandler = (
    wordId: string,
    type: QuestionType,
    word: string
  ) => {
    regenerate({
      wordId,
      type,
      quizWordIds: Array.from(
        new Set(challenges.map((c) => c.wordId).filter((c) => c !== wordId))
      ),
      word,
    });
  };
  useEffect(() => {
    if (!data) return;
    const index = challenges.findIndex(
      (i) => i.wordId === wordId && i.__type === type
    );
    dispatch(updateSingleChallenge({ index, challenge: data }));
    // eslint-disable-next-line
  }, [data, error, challenges, type, wordId]);
  return (
    <button
      className="btn generate"
      onClick={() => regenerateHandler(wordId, type, word)}
    >
      <RandomIcon />
    </button>
  );
};

export default RegenerateChallengeButton;
