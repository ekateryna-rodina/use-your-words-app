import { useEffect } from "react";
import { useFetchQuizzesQuery } from "../../features/app-api-slice";
import Quiz from "../Quiz/Quiz";

const QuizList = () => {
  const { data, isLoading } = useFetchQuizzesQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="mt-4 flex gap-2">
      {data?.map((q) => (
        <Quiz quizId={q.id} />
      ))}
    </div>
  );
};

export default QuizList;
