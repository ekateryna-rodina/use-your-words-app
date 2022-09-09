import { useEffect, useState } from "react";
import { Quiz as QuizType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import { useFetchQuizzesQuery } from "../../features/app-api-slice";
import { Loading } from "../Loading";
import { Quiz } from "../Quiz";

const QuizList = ({ allowDelete }: { allowDelete: Function }) => {
  const { data, isLoading } = useFetchQuizzesQuery();
  const { quizWords } = useAppSelector((state) => state.search);
  const [quizzes, setQuizzes] = useState<QuizType[]>(data ?? []);

  const startsWith = (word: string) => {
    for (let term of quizWords) {
      if (word.startsWith(term)) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (quizWords.filter((w) => w).length) {
      const filteredQuizzes =
        data?.filter(
          (q) =>
            q.challenges.filter((c) => startsWith(c.word as string)).length > 0
        ) ?? [];
      setQuizzes(filteredQuizzes);
    } else {
      setQuizzes(data ?? []);
    }
    // eslint-disable-next-line
  }, [quizWords, data]);

  if (isLoading) return <Loading />;
  if (!quizzes?.length && !isLoading)
    return <div className="text-center  mt-8">No quizzes added yet</div>;

  return (
    <div className="mt-4 flex gap-2 flex-wrap overflow-y-auto max-h-[80vh]">
      {quizzes.length ? (
        quizzes.map((q) => (
          <Quiz key={q.name} quizId={q.id} allowDelete={allowDelete} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuizList;
