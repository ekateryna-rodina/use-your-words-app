import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setDailyProgress,
  setQuestionQuizScores,
  setQuizProgress,
  setTotalScores,
} from "../features/scoring/scoring-slice";
import { ChallengeResults } from "../types";

export function useScoring<
  P extends { quizId?: string; questionId?: string; result?: ChallengeResults }
>(props: P) {
  const { quizId, questionId, result } = props;
  const dispatch = useAppDispatch();
  const { totalAnswered, scoresByQuiz, totalSuccess } = useAppSelector(
    (state) => state.scoring
  );
  const { dailyGoal } = useAppSelector((state) => state.userSettings);
  const { currentQuizChallengeIds } = useAppSelector((state) => state.practice);
  const setScore = (
    quizId: string,
    questionId: string,
    result: ChallengeResults
  ) => {
    dispatch(setQuestionQuizScores({ quizId, questionId, result }));
    dispatch(setTotalScores(result));
  };
  useEffect(() => {
    if (
      quizId === null ||
      questionId === null ||
      result === ChallengeResults.None
    )
      return;
    setScore(
      quizId as string,
      questionId as string,
      result as ChallengeResults
    );
    // eslint-disable-next-line
  }, [quizId, questionId, result]);
  useEffect(() => {
    if (totalAnswered === 0 || !quizId) return;
    const currentQuizTotalQuestions = currentQuizChallengeIds.length;
    const currentQuizSuccessQuestions =
      scoresByQuiz[quizId as string].totalSuccess;
    dispatch(
      setQuizProgress({
        quizId,
        progress:
          (currentQuizSuccessQuestions * 100) / currentQuizTotalQuestions,
      })
    );
    // TODO: connect to history. This is temp
    dispatch(setDailyProgress((totalSuccess * 100) / dailyGoal));
    //   eslint-disable-next-line
  }, [totalAnswered, quizId]);
}
