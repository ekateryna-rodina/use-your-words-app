import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { SearchVocabulary } from "../components/SearchVocabulary";
import Words from "../components/Words/Words";
import { useFetchPartsOfSpeechQuery } from "../features/app-api-slice";
import { setActiveTab } from "../features/tabs/tabs-slice";
import { PartOfSpeech, WordWithId } from "../types/";

const Vocabulary = () => {
  const [partsOfSpeech, setPartsOfSpeech] = useState<PartOfSpeech[]>([]);
  const [modal, setModal] = useState<{
    show: boolean;
  }>({ show: false });

  const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<WordWithId | undefined>();

  // const partOfSpeechURL = `${baseURL}/partOfSpeech`;
  const [showCreateQuizModal, setShowCreateQuizModal] =
    useState<boolean>(false);
  const quizQuestionsLimitLength = 4;
  const dispatch = useAppDispatch();

  const apiPartsOfSpeechResponse = useFetchPartsOfSpeechQuery();

  useEffect(() => {
    dispatch(setActiveTab("vocabulary"));
    // eslint-disable-next-line
  }, []);

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
    </div>
  );
};

export default Vocabulary;
