import React, { useEffect, useState } from "react";
import { AddNewWord } from "../components/AddNewWord";
import DeleteIcon from "../components/icons/DeleteIcon";
import EditIcon from "../components/icons/EditIcon";
import { PlaySound } from "../components/PlaySound";
import { WordOutput } from "../types/Word";
import request from "../utils/request";

const Vocabulary = () => {
  const [words, setWords] = useState<WordOutput[] | null>(null);
  const [modal, setModal] = useState<{
    show: boolean;
    action: "add" | "edit";
    word?: WordOutput;
  }>({ show: false, action: "add" });
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

  const onDeleteHanlder = (id: string) => {
    request(deleteUrl, { id }, "DELETE")
      .then((response) => console.log("success delete"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button onClick={() => setModal({ show: true, action: "add" })}>
        Add New
      </button>
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
              <tr>
                <td>{w.word}</td>
                <td>{w.partOfSpeech}</td>
                <td>
                  <PlaySound fileUrl={w.fileUrl} />
                </td>
                <td>{w.meaning}</td>
                <td>{w.phrases}</td>
                <td>{w.synonyms}</td>
                <td>{w.antonyms}</td>
                <td>
                  <button
                    onClick={() =>
                      setModal({ show: true, action: "edit", word: w })
                    }
                  >
                    <EditIcon />
                  </button>
                  <button onClick={() => onDeleteHanlder(w.id)}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div
        style={{
          position: "absolute",
          background: "white",
          inset: "0",
          opacity: modal.show ? 1 : 0,
          pointerEvents: modal.show ? "auto" : "none",
        }}
      >
        {}
        <AddNewWord />
      </div>
    </div>
  );
};

export default Vocabulary;
