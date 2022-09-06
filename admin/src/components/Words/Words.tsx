import { useEffect, useState } from "react";
import { WordWithId } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import { useFetchVocabularyQuery } from "../../features/app-api-slice";
import Word from "../Word/Word";

const Words = ({ allowDelete }: { allowDelete: Function }) => {
  const searchState = useAppSelector((state) => state.search);
  const [words, setWords] = useState<WordWithId[] | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  const apiWordsResponse = useFetchVocabularyQuery();

  useEffect(() => {
    if (apiWordsResponse.isLoading) return;
    setWords(apiWordsResponse.data?.words ?? []);
  }, [apiWordsResponse]);
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
      setWords(wordsFound);
    } else {
      setWords(apiWordsResponse?.data?.words ?? []);
    }
    // eslint-disable-next-line
  }, [searchState]);
  if (!words?.length && !apiWordsResponse.isLoading)
    return <div className="text-center  mt-8">No words added yet</div>;
  if (apiWordsResponse.isLoading || !words) {
    return (
      <div className="h-full flex justify-center items-start pt-8">
        <div className="loading loading-lg"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col mt-4 max-h-[72vh] overflow-y-auto pr-[10px]">
      {Array.from(new Set(words?.map((w) => w.word[0].toUpperCase())))
        .sort()
        .map((l, i) => (
          <div className={`${i !== 0 ? "mt-4" : ""}`} key={l}>
            <span className="text-xl text-slate-300 font-bold mb-[4px]" key={l}>
              {l}
            </span>
            <div className="flex flex-col md:flex-row flex-wrap md:gap-[3px]">
              {words
                .filter((w) => w.word[0].toLowerCase() === l.toLowerCase())
                .map((w, i) => (
                  <Word
                    words={words}
                    word={w}
                    index={i}
                    letter={l}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    key={w.id}
                    allowDelete={allowDelete}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Words;
