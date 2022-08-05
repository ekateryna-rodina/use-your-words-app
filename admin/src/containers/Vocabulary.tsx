import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { SearchVocabulary } from "../components/SearchVocabulary";
import { WordDetails } from "../components/WordDetails";
import Words from "../components/Words/Words";
import { useFetchPartsOfSpeechQuery } from "../features/app-api-slice";
import { setActiveTab } from "../features/tabs/tabs-slice";
import { PartOfSpeech } from "../types/";

const Vocabulary = () => {
  const [partsOfSpeech, setPartsOfSpeech] = useState<PartOfSpeech[]>([]);

  const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { currentWordId, isEdit } = useAppSelector(
    (state) => state.wordDetails
  );
  const apiPartsOfSpeechResponse = useFetchPartsOfSpeechQuery();

  useEffect(() => {
    dispatch(setActiveTab("vocabulary"));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (apiPartsOfSpeechResponse.isLoading) return;
    setPartsOfSpeech(apiPartsOfSpeechResponse.data ?? []);
  }, [apiPartsOfSpeechResponse]);

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

  return (
    <div>
      {/* <button onClick={() => setModal({ show: true })}>Add New</button> */}
      <SearchVocabulary />
      <Words />
      {/* {modal.show ? (
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
      )} */}
      <div
        className={`absolute inset-0 transition bg-slate-100 p-4 ${
          !currentWordId ? "translate-y-full" : ""
        }`}
      >
        {currentWordId ? <WordDetails /> : <></>}
      </div>
    </div>
  );
};

export default Vocabulary;
