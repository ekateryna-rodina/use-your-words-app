import React, { useEffect, useState } from "react";
import { AddNewWord } from "../components/AddNewWord";
import { Word } from "../types/Word";

const Vocabulary = () => {
  const [words, setWords] = useState<Word[] | null>(null);
  const [showAddNewDialog, setShowAddNewDialog] = useState<boolean>(false);

  useEffect(() => {
    const fetchVocabulary = async () => {
      const response = await fetch("http://localhost:8080/api/words");
      const { words } = await response.json();
      setWords(words);
    };
    fetchVocabulary().catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <button onClick={() => setShowAddNewDialog(true)}>Add New</button>
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
                <td>{w.fileUrl}</td>
                <td>{w.meaning}</td>
                <td>{w.phrases}</td>
                <td>{w.synonyms}</td>
                <td>{w.antonyms}</td>
                <td></td>
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
          opacity: showAddNewDialog ? 1 : 0,
          pointerEvents: showAddNewDialog ? "auto" : "none",
        }}
      >
        <AddNewWord />
      </div>
    </div>
  );
};

export default Vocabulary;
