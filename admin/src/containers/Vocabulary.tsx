import React, { useEffect, useState } from "react";
import { AddEditWord } from "../components/AddEditWord";
import DeleteIcon from "../components/icons/DeleteIcon";
import EditIcon from "../components/icons/EditIcon";
import { PlaySound } from "../components/PlaySound";
import { FormValue, PartOfSpeech, WordWithId } from "../types/";
import request from "../utils/request";

const Vocabulary = () => {
  const [words, setWords] = useState<WordWithId[] | null>(null);
  const [partsOfSpeech, setPartsOfSpeech] = useState<PartOfSpeech[]>([]);
  const [modal, setModal] = useState<{
    show: boolean;
  }>({ show: false });
  const [currentWord, setCurrentWord] = useState<WordWithId | undefined>();
  const baseURL = "http://localhost:8080/api";
  const wordURL = `${baseURL}/words`;
  const partOfSpeechURL = `${baseURL}/partOfSpeech`;

  useEffect(() => {
    const fetchVocabulary = async () => {
      const response = await fetch(wordURL);
      const { words } = await response.json();
      setWords(words);
    };
    const fetchPartsOfSpeech = async () => {
      const response = await fetch(partOfSpeechURL);
      const parts = await response.json();
      setPartsOfSpeech(parts);
    };
    fetchVocabulary().catch((err) => console.log(err));
    fetchPartsOfSpeech().catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!currentWord || !Object.keys(currentWord).length) return;
    setModal({ show: true });
  }, [currentWord]);

  const onDeleteHandler = (id: string) => {
    request(wordURL, { id }, "DELETE")
      .then((response) => console.log("success delete"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button onClick={() => setModal({ show: true })}>Add New</button>
      {!words ? (
        <span>no words</span>
      ) : (
        <table style={{ width: "100%", height: "100%" }}>
          <thead>
            <tr>
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
      )}
      {modal.show ? (
        <AddEditWord word={currentWord} tempParts={partsOfSpeech} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Vocabulary;
