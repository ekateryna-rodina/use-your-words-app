import { useFetchQuizzesQuery } from "../../features/app-api-slice";
import { Loading } from "../Loading";
import { Quiz } from "../Quiz";

const QuizList = () => {
  const { data, isLoading } = useFetchQuizzesQuery();
  if (isLoading) return <Loading />;
  if (!data?.length && !isLoading)
    return <div className="text-center  mt-8">No quizzes added yet</div>;

  return (
    <div className="mt-4 flex gap-2 flex-wrap overflow-y-auto max-h-[80vh]">
      {data?.map((q) => (
        <Quiz key={q.name} quizId={q.id} />
      ))}
    </div>
  );
};

export default QuizList;
