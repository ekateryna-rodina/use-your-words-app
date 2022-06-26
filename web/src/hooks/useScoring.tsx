import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  setQuestionQuizScores,
  setTotalScores,
} from "../features/scoring/scoring-slice";
import { ChallengeResults } from "../types";

export function useScoring<
  P extends { quizId: string; questionId: string; result: ChallengeResults }
>(props: P) {
  const { quizId, questionId, result } = props;
  const dispatch = useAppDispatch();

  const setScore = (
    quizId: string,
    questionId: string,
    result: ChallengeResults
  ) => {
    dispatch(setQuestionQuizScores({ quizId, questionId, result }));
    dispatch(setTotalScores(result));
  };
  useEffect(() => {
    setScore(quizId, questionId, result);
    // eslint-disable-next-line
  }, [quizId, questionId, result]);
}
