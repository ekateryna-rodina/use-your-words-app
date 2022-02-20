import db from "../models";
import { antonyms } from "./antonyms";
import { meanings } from "./meanings";
import { partsOfSpeech } from "./partOfSpeech";
import { phrases } from "./phrases";
import { synonyms } from "./synonyms";
import { wordPartOfSpeech } from "./wordPartOfSpeech";
import { words } from "./words";

function createWords() {
  words.forEach((w) => {
    db.Word.create(w);
  });
}
function createPartOfSpeech() {
  partsOfSpeech.map((p) => {
    db.PartOfSpeech.create(p);
  });
}

function createWordPartOfSpeech() {
  wordPartOfSpeech.map((wp) => {
    db.WordPartOfSpeech.create(wp);
  });
}

function restInfo() {
  const wordId = "7315f619-563f-44c3-9342-47eb07c56e0c";
  meanings.map((m) => {
    db.Meaning.create({ ...m, wordId });
  });
  phrases.map((p) => {
    db.Phrase.create({ ...p, wordId });
  });
  synonyms.map((s) => {
    db.Synonym.create({ ...s, wordId });
  });
  antonyms.map((a) => {
    db.Antonym.create({ ...a, wordId });
  });
}

export function runSeed() {
  //   createWords();
  //   createPartOfSpeech();
  // createWordPartOfSpeech();
  // restInfo();
}
