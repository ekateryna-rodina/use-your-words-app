import { useEffect, useState } from "react";
import { WordWithId } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setIncludedWordIds } from "../../features/addNewQuiz/addnewquiz-slice";
import { apiSlice } from "../../features/app-api-slice";
import { QuizWord } from "../QuizWord";

const QuizWords = () => {
  const maxQuizQuestions = 7;
  const { data: vocabularyWords } =
    apiSlice.endpoints.fetchVocabulary.useQueryState();
  const [words, setWords] = useState(vocabularyWords?.words ?? []);
  const { data: quizzes } = apiSlice.endpoints.fetchQuizzes.useQueryState();
  const connectedToQuiz: { [id: string]: string[] } =
    (quizzes?.reduce((acc: { [id: string]: string[] }, curr) => {
      let quizName = curr.name;
      let quizWordIds = Array.from(
        new Set(curr.challenges.map((c) => c.wordId))
      );
      quizWordIds.forEach((id: string) => {
        if (!(id in acc)) {
          acc[id] = [];
        }
        acc[id] = [...acc[id], quizName];
      });
      return acc;
    }, {}) as { [id: string]: string[] }) ?? {};
  const dispatch = useAppDispatch();
  const includeWordHandler = (word: WordWithId) => {
    const isIncluded = includedWordIds.filter(
      (id: string) => id === word.id
    ).length;
    let wordsToInclude = [];
    if (isIncluded) {
      wordsToInclude = includedWordIds.filter((w) => w !== word.id);
    } else {
      wordsToInclude = [...includedWordIds, word.id];
    }
    dispatch(setIncludedWordIds(wordsToInclude));
  };
  const { includedWordIds, isHideConnectedToQuiz } = useAppSelector(
    (state) => state.addNewQuiz
  );
  const toggleConnectedToQuiz = () => {
    let words;
    if (isHideConnectedToQuiz) {
      words = vocabularyWords?.words.filter((w) => !(w.id in connectedToQuiz));
    } else {
      words = vocabularyWords?.words;
    }
    setWords(words ?? []);
  };
  useEffect(() => {
    toggleConnectedToQuiz();
  }, [isHideConnectedToQuiz]);
  return (
    <>
      {words.map((w) => (
        <QuizWord
          key={w.id}
          checked={includedWordIds.includes(w.id)}
          disabled={
            includedWordIds?.length >= maxQuizQuestions &&
            !includedWordIds.includes(w.id)
          }
          onChange={includeWordHandler}
          word={w}
          connectedToQuiz={connectedToQuiz[w.id] ?? []}
        />
      ))}
    </>
  );
};

export default QuizWords;
