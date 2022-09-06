import { useState } from "react";
import { Quiz as QuizType } from "use-your-words-common";
import { apiSlice } from "../../features/app-api-slice";

type QuizProps = {
  quizId: string;
};
const Quiz = ({ quizId }: QuizProps) => {
  const { data } = apiSlice.endpoints.fetchQuizzes.useQueryState();
  const [challengeWords, setChallengeWords] = useState([]);
  const { name, challenges } = data?.filter(
    (q) => q.id === quizId
  )[0] as QuizType;
  //   Fetch words from cache
  const { data: words } = apiSlice.endpoints.fetchVocabulary.useQuery();

  //   useEffect(() => {
  //     const wordIds = Array.from(new Set(challenges.map((c) => c.wordId)));
  //     const challengeWords = wordIds.map(
  //       (id) => words?.words.filter((w) => w.id === id)[0].word
  //     ) as [];
  //     setChallengeWords(challengeWords);
  //     // eslint-disable-next-line
  //   }, [challenges, name]);

  return (
    <div className="p-2 border border-slate-300">
      <h4 className="text-blue-300">{name}</h4>
      <div className="flex flex-wrap gap-2 mt-2">
        {Array.from(new Set(challenges.map((c) => c.wordId))).map((w) => (
          <div key={w} className="p-2 text-sm bg-slate-100">
            {w}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
