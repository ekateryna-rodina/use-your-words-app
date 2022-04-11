import React, { useState } from "react";
import { WordWithId } from "use-your-words-common";
import { Collapsible } from "../Collapsible";
import { List } from "../List";

type WordInfoAccordionProps = {
  word: WordWithId;
};
const WordInfoAccordion = ({ word }: WordInfoAccordionProps) => {
  const [active, setActive] = useState<string[] | string | undefined>([]);
  const exclude = (key: string) =>
    typeof word[key as keyof typeof word] !== "string" &&
    key !== "partOfSpeech";
  return (
    <div className="accordion">
      {Object.keys(word)
        .filter((key) => exclude(key))
        .map((k) => (
          <Collapsible
            key={k}
            title={k[0].toUpperCase() + k.slice(1)}
            active={active}
            setActive={setActive}
            isMultiActive={true}
            titleStyle={"text-gray-800 dark:text-dark-800"}
          >
            <List
              items={(word[k as keyof typeof word] as []).map(
                (i) => (i as { id?: string; value: string }).value
              )}
              direction="vertical"
            />
          </Collapsible>
        ))}
    </div>
  );
};

export default WordInfoAccordion;
