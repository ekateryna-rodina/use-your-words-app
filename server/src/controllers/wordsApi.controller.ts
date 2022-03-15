import { fetchInfo } from "../services/wordsApi.service";
import { Word } from "../types/Word";

// const mapToWord = (obj) => {
//   const result: Partial<Word> = {};
//   result.word = obj.word;
//   result.partOfSpeech = obj.meanings.map((m) => m.partOfSpeech);
//   result.meaning = [
//     ...obj.meanings.map((m) =>
//       [...m.definitions.map((d) => d.definition)].join("|")
//     ),
//   ].join("|");
//   result.fileUrl = obj.phonetics.filter((p) => "audio" in p)[0]?.audio ?? "";
//   const phrases = [
//     ...Object.values(obj.collocations).map((c: { examples: [] }) =>
//       [...c.examples].join("|")
//     ),
//   ].join("|");
//   const formattedCollections = phrases
//     .replace(/ \<b>/g, " ")
//     .replace(/<\/b>/g, "")
//     .replace(/ \./g, ".")
//     .replace(/ \,/g, ",")
//     .replace(/ \?/g, "?")
//     .replace(/ \!/g, "!");

//   result.phrases = formattedCollections;

//   const synonyms = Array.from(
//     new Set(obj.synonymsAntonyms?.meta.syns.map((s) => s).flat())
//   ).join("|");

//   const antonyms = Array.from(
//     new Set(obj.synonymsAntonyms?.meta.ants.map((s) => s).flat())
//   ).join("|");
//   result.synonyms = synonyms;
//   result.antonyms = antonyms;
//   return result;
// };
const cleanText = (text: string) => {
  return text
    .replace(/ \<b>/g, " ")
    .replace(/<\/b>/g, "")
    .replace(/ \./g, ".")
    .replace(/ \,/g, ",")
    .replace(/ \?/g, "?")
    .replace(/ \!/g, "!");
};
const mapToWord = (obj) => {
  const result: Partial<Word> = {};
  result.word = obj.word;
  result.partOfSpeech = obj.meanings.map((m) => m.partOfSpeech);
  result.meanings = [
    ...obj.meanings.map((m) => [...m.definitions.map((d) => d.definition)]),
  ].flat();
  result.fileUrl = obj.phonetics.filter((p) => "audio" in p)[0]?.audio ?? "";
  const phrases = [
    ...Object.values(obj.collocations).map((c: { examples: [] }) => [
      ...c.examples,
    ]),
  ]
    .flat()
    .map((s) => cleanText(s));

  result.phrases = phrases;

  const synonyms: string[] = Array.from(
    new Set(obj.synonymsAntonyms?.meta.syns.map((s) => s).flat())
  );

  const antonyms: string[] = Array.from(
    new Set(obj.synonymsAntonyms?.meta.ants.map((s) => s).flat())
  );
  result.synonyms = synonyms;
  result.antonyms = antonyms;
  return result;
};
export default async function fetchWordInfo(word: string) {
  try {
    const data = await fetchInfo(word);
    const wordInfo: Partial<Word> = mapToWord(data);
    return wordInfo;
  } catch (error) {
    throw new Error(error);
  }
}
