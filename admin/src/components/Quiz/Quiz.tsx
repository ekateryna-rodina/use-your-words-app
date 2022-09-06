import { Quiz as QuizType } from "use-your-words-common";
import { apiSlice } from "../../features/app-api-slice";

type QuizProps = {
  quizId: string;
};
const Quiz = ({ quizId }: QuizProps) => {
  const { data } = apiSlice.endpoints.fetchQuizzes.useQuery();
  const { name, challenges } = data?.filter(
    (q) => q.id === quizId
  )[0] as QuizType;
  return (
    <div className="p-2 border border-slate-300">
      <h4 className="text-blue-300">{name}</h4>
      <div className="flex flex-wrap gap-2">{}</div>
    </div>
  );
};

export default Quiz;
