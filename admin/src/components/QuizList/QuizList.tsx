import { useEffect } from "react";
import { useFetchQuizzesQuery } from "../../features/app-api-slice";
import Quiz from "../Quiz/Quiz";

const QuizList = () => {
  const { data, isLoading } = useFetchQuizzesQuery();
  useEffect(() => {
    console.log("da", data);
  }, [data]);
  if (isLoading) return <div className="loading ml-[3px]">1</div>;
  if (!data?.length)
    return <div className="text-center  mt-8">No quizzes added yet</div>;
  return (
    <div className="mt-4 flex gap-2 flex-wrap overflow-y-auto max-h-[80vh]">
      {data?.map((q) => (
        <Quiz key={q.id} quizId={q.id} />
      ))}
    </div>
  );
};

export default QuizList;
