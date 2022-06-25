import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setAnsweredResult,
  setCorrectAnswer,
} from "../features/practiceActions/practiceactions-slice";
import { ChallengeResults } from "../types";
export function useAnswerResult<
  P extends { userAnswer: string; challengeId: string }
>(props: P) {
  const { userAnswer, challengeId } = props;
  const { isAnswered } = useAppSelector((state) => state.practiceActions);
  const [result, setResult] = useState<ChallengeResults>(ChallengeResults.None);
  const dispatch = useAppDispatch();
  const {
    currentChallengeIndex,
    currentQuizChallengeIds,
    currentQuizChallenges,
  } = useAppSelector((state) => state.practice);
  useEffect(() => {
    if (!isAnswered) return;
    const isCurrent =
      currentChallengeIndex !== null &&
      challengeId === currentQuizChallengeIds[currentChallengeIndex];
    console.log("answered", challengeId);
    if (isCurrent) {
      const correctAnswer = currentQuizChallenges[challengeId].answer;
      const result =
        correctAnswer === userAnswer
          ? ChallengeResults.Success
          : ChallengeResults.Failure;
      setResult(result);
    }
    // eslint-disable-next-line
  }, [
    isAnswered,
    // userAnswer,
    // currentChallengeIndex,
    // currentQuizChallengeIds,
    // challengeId,
    // currentQuizChallenges,
  ]);
  useEffect(() => {
    if (currentChallengeIndex !== null) {
      dispatch(
        setCorrectAnswer(
          currentQuizChallenges[currentQuizChallengeIds[currentChallengeIndex]]
            .answer as string
        )
      );
    }

    // eslint-disable-next-line
  }, [currentChallengeIndex, currentQuizChallenges]);
  useEffect(() => {
    dispatch(
      setAnsweredResult({
        result,
      })
    );
    // eslint-disable-next-line
  }, [result]);
  return result;
}
