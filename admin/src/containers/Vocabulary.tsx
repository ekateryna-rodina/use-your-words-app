import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AddEditWord } from "../components/AddEditWord";
import { CreateQuiz } from "../components/CreateQuiz";
import DeleteIcon from "../components/icons/DeleteIcon";
import DetailsIcon from "../components/icons/DetailsIcon";
import { SearchVocabulary } from "../components/SearchVocabulary";
import {
  useFetchPartsOfSpeechQuery,
  useFetchVocabularyQuery,
} from "../features/app-api-slice";
import { setActiveTab } from "../features/tabs/tabs-slice";
import { PartOfSpeech, WordWithId } from "../types/";

const Vocabulary = () => {
  const [words, setWords] = useState<WordWithId[] | null>(null);
  const [partsOfSpeech, setPartsOfSpeech] = useState<PartOfSpeech[]>([]);
  const [modal, setModal] = useState<{
    show: boolean;
  }>({ show: false });

  const minSwipeDistance = 50;
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<WordWithId | undefined>();

  // const partOfSpeechURL = `${baseURL}/partOfSpeech`;
  const [showCreateQuizModal, setShowCreateQuizModal] =
    useState<boolean>(false);
  const quizQuestionsLimitLength = 4;
  const dispatch = useAppDispatch();
  const apiWordsResponse = useFetchVocabularyQuery();
  const apiPartsOfSpeechResponse = useFetchPartsOfSpeechQuery();
  const searchState = useAppSelector((state) => state.search);
  useEffect(() => {
    dispatch(setActiveTab("vocabulary"));
    // eslint-disable-next-line
  }, []);
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
      console.log(searchState.words, wordsFound);
      setWords(wordsFound);
    } else {
      setWords(apiWordsResponse?.data?.words ?? []);
    }
    // eslint-disable-next-line
  }, [searchState]);
  useEffect(() => {
    if (apiWordsResponse.isLoading) return;
    setWords(apiWordsResponse.data?.words ?? []);
  }, [apiWordsResponse]);
  useEffect(() => {
    if (apiPartsOfSpeechResponse.isLoading) return;
    setPartsOfSpeech(apiPartsOfSpeechResponse.data ?? []);
  }, [apiPartsOfSpeechResponse]);
  useEffect(() => {
    if (!currentWord || !Object.keys(currentWord).length) return;
    setModal({ show: true });
  }, [currentWord]);

  const onDeleteHandler = (id: string) => {
    // request(wordURL, { id }, "DELETE")
    //   .then((response) => console.log("success delete"))
    //   .catch((err) => console.log(err));
  };

  const toggleQuizList = (wordId: string) => {
    if (quizQuestions.includes(wordId)) {
      const newQuizQuestions = quizQuestions.filter((q) => q !== wordId);
      setQuizQuestions(newQuizQuestions);
    } else {
      setQuizQuestions([...quizQuestions, wordId]);
    }
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>, id: string) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) {
      if (isLeftSwipe) {
        setExpanded([...expanded, id]);
      }
      if (isRightSwipe) {
        setExpanded(expanded.filter((e) => e !== id));
      }
    }
  };

  return (
    <div>
      {/* <button onClick={() => setModal({ show: true })}>Add New</button> */}
      <SearchVocabulary />
      {!words ? (
        <span>no words</span>
      ) : (
        <div className="flex flex-col mt-4">
          {Array.from(new Set(words.map((w) => w.word[0].toUpperCase())))
            .sort()
            .map((l, i) => (
              <div className={`${i !== 0 ? "mt-4" : ""}`} key={l}>
                <span
                  className="text-xl text-slate-300 font-bold mb-[4px]"
                  key={l}
                >
                  {l}
                </span>
                <div className="flex flex-col sm:flex-row flex-wrap gap-[3px]">
                  {words
                    .filter((w) => w.word[0].toLowerCase() === l.toLowerCase())
                    .map((w, i) => (
                      <div
                        className={`relative border border-slate-300 p-4 overflow-hidden sm:w-[18rem] ${
                          i !==
                          words.filter(
                            (w) => w.word[0].toLowerCase() === l.toLowerCase()
                          ).length -
                            1
                            ? "border-b-0"
                            : ""
                        } sm:border-b-1`}
                        key={w.id}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={(e) => onTouchEnd(e, w.id)}
                      >
                        <span>{w.word}</span>
                        {/* media xs */}
                        <div
                          className={`transition-transform bg-blue-300 absolute top-0 bottom-0 right-0 ${
                            !expanded.includes(w.id) ? "translate-x-full" : ""
                          }`}
                        >
                          <div className="flex flex-row justify-center items-center gap-[3px] h-full">
                            <button className="p-4">
                              <DetailsIcon />
                            </button>
                            <button className="p-4">
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                        {/* media sm+ */}
                        <div
                          className={`hidden bg-blue-300 absolute top-0 bottom-0 right-0 sm:block`}
                        >
                          <div className="flex flex-row justify-center items-center gap-[3px] h-full">
                            <button className="p-4">
                              <DetailsIcon />
                            </button>
                            <button className="p-4">
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      </div>
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
      )}
      {modal.show ? (
        <AddEditWord word={currentWord} tempParts={partsOfSpeech} />
      ) : (
        <></>
      )}
      {showCreateQuizModal ? (
        <CreateQuiz
          words={words?.filter((w) => quizQuestions.includes(w.id)) ?? []}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Vocabulary;
