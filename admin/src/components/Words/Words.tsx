import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useFetchVocabularyQuery } from "../../features/app-api-slice";
import { WordWithId } from "../../types";
import Word from "../Word/Word";

const Words = ({ allowDelete }: { allowDelete: Function }) => {
  const searchState = useAppSelector((state) => state.search);
  const [words, setWords] = useState<WordWithId[] | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  const apiWordsResponse = useFetchVocabularyQuery();

  useEffect(() => {
    if (apiWordsResponse.isLoading) return;
    setWords(apiWordsResponse.data?.words ?? []);
  }, [apiWordsResponse]);
  useEffect(() => {
    if (searchState.words.filter((w) => w !== "").length > 0) {
      const wordsFound = searchState.words.reduce(
        (acc: WordWithId[], curr: string) => {
          if (!curr) return acc;
          const foundForSingleTerm =
            apiWordsResponse.data?.words.filter((w) =>
              w.word.startsWith(curr)
            ) ?? [];
          return [...acc, ...foundForSingleTerm];
        },
        []
      );
      setWords(wordsFound);
    } else {
      setWords(apiWordsResponse?.data?.words ?? []);
    }
    // eslint-disable-next-line
  }, [searchState]);
  if (apiWordsResponse.isLoading || !words) {
    return (
      <div className="h-full flex justify-center items-start pt-8">
        <div className="loading loading-lg"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col mt-4 max-h-[72vh] overflow-y-auto pr-[10px]">
      {Array.from(new Set(words?.map((w) => w.word[0].toUpperCase())))
        .sort()
        .map((l, i) => (
          <div className={`${i !== 0 ? "mt-4" : ""}`} key={l}>
            <span className="text-xl text-slate-300 font-bold mb-[4px]" key={l}>
              {l}
            </span>
            <div className="flex flex-col md:flex-row flex-wrap md:gap-[3px]">
              {words
                .filter((w) => w.word[0].toLowerCase() === l.toLowerCase())
                .map((w, i) => (
                  <Word
                    words={words}
                    word={w}
                    index={i}
                    letter={l}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    key={w.id}
                    allowDelete={allowDelete}
                  />
                ))}
            </div>
          </div>
        ))}
      {/* {words.map((w, i) => (
      <div
        className={`border border-slate-300 p-4 ${
          i !== words.length - 1 ? "border-b-0" : ""
        }`}
        key={w.id}
      >
        {w.word}
      </div>
    ))} */}

      {/* <button
      disabled={quizQuestions.length < quizQuestionsLimitLength}
      onClick={() => setShowCreateQuizModal(true)}
    >
      Create Quiz
    </button> */}
      {/* <table style={{ width: "100%", height: "100%" }}>
      <thead>
        <tr>
          <th></th>
          <th>Word</th>
          <th>Part of speech</th>
          <th>Pronounce</th>
          <th>Meaning</th>
          <th>Phases</th>
          <th>Synonyms</th>
          <th>Antonyms</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {words.map((w) => (
          <tr key={w.id}>
            <td>
              <input
                type="checkbox"
                disabled={
                  quizQuestions.length >= quizQuestionsLimitLength &&
                  !quizQuestions.includes(w.id)
                }
                onClick={() => toggleQuizList(w.id)}
              />
            </td>
            <td>{w.word}</td>
            <td>
              <ul>
                {w.partOfSpeech.map((item: {}) => (
                  <li key={(item as FormValue).id}>
                    {(item as FormValue).value}
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <PlaySound fileUrl={w.fileUrl} />
            </td>
            <td>
              {w.meanings.map((item: {}) => (
                <li key={(item as FormValue).id}>
                  {(item as FormValue).value}
                </li>
              ))}
            </td>
            <td>
              {w.phrases.map((item: {}) => (
                <li key={(item as FormValue).id}>
                  {(item as FormValue).value}
                </li>
              ))}
            </td>
            <td>
              {w.synonyms.map((item: {}) => (
                <li key={(item as FormValue).id}>
                  {(item as FormValue).value}
                </li>
              ))}
            </td>
            <td>
              {w.antonyms.map((item: {}) => (
                <li key={(item as FormValue).id}>
                  {(item as FormValue).value}
                </li>
              ))}
            </td>
            <td>
              <button onClick={() => setCurrentWord(w)}>
                <EditIcon />
              </button>
              <button onClick={() => onDeleteHandler(w.id)}>
                <DeleteIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table> */}
    </div>
  );
};

export default Words;
