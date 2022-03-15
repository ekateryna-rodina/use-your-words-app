import React, { useEffect, useState } from "react";
import { AddNewWord } from "../components/AddNewWord";
import DeleteIcon from "../components/icons/DeleteIcon";
import EditIcon from "../components/icons/EditIcon";
import { PlaySound } from "../components/PlaySound";
import { WordWithId } from "../types/Word";
import request from "../utils/request";

const Vocabulary = () => {
  const [words, setWords] = useState<WordWithId[] | null>(null);
  const [modal, setModal] = useState<{
    show: boolean;
  }>({ show: false });
  const [currentWord, setCurrentWord] = useState<WordWithId | undefined>();
  const [getUrl, deleteUrl] = [
    "http://localhost:8080/api/words",
    "http://localhost:8080/api/words",
  ];
  useEffect(() => {
    const fetchVocabulary = async () => {
      const response = await fetch(getUrl);
      const { words } = await response.json();
      setWords(words);
    };
    fetchVocabulary().catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!currentWord) return;
    setModal({ show: true });
  }, [currentWord]);

  const onDeleteHandler = (id: string) => {
    request(deleteUrl, { id }, "DELETE")
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
                <td>{w.partOfSpeech}</td>
                <td>
                  <PlaySound fileUrl={w.fileUrl} />
                </td>
                <td>{w.meanings}</td>
                <td>{w.phrases}</td>
                <td>{w.synonyms}</td>
                <td>{w.antonyms}</td>
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
      {modal.show ? <AddNewWord word={currentWord} /> : <></>}
    </div>
  );
};

export default Vocabulary;
