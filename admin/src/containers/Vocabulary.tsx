import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { AddEditWord } from "../components/AddEditWord";
import { CreateQuiz } from "../components/CreateQuiz";
import DeleteIcon from "../components/icons/DeleteIcon";
import EditIcon from "../components/icons/EditIcon";
import { PlaySound } from "../components/PlaySound";
import { SearchVocabulary } from "../components/SearchVocabulary";
import {
  useFetchPartsOfSpeechQuery,
  useFetchVocabularyQuery,
} from "../features/app-api-slice";
import { setActiveTab } from "../features/tabs/tabs-slice";
import { FormValue, PartOfSpeech, WordWithId } from "../types/";

const Vocabulary = () => {
  const [words, setWords] = useState<WordWithId[] | null>(null);
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
  const apiWordsResponse = useFetchVocabularyQuery();
  const apiPartsOfSpeechResponse = useFetchPartsOfSpeechQuery();
  useEffect(() => {
    dispatch(setActiveTab("vocabulary"));
    // eslint-disable-next-line
  }, []);
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

  return (
    <div>
      {/* <button onClick={() => setModal({ show: true })}>Add New</button> */}
      <SearchVocabulary />
      {!words ? (
        <span>no words</span>
      ) : (
        <>
          <button
            disabled={quizQuestions.length < quizQuestionsLimitLength}
            onClick={() => setShowCreateQuizModal(true)}
          >
            Create Quiz
          </button>
          <table style={{ width: "100%", height: "100%" }}>
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
          </table>
        </>
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
