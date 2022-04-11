import React, { useState } from "react";
import { WordWithId } from "use-your-words-common";
import { Collapsible } from "../Collapsible";
import { List } from "../List";
import { PlaySound } from "../PlaySound";
import { WordInfoAccordion } from "../WordInfoAccordion";

type WordsAccordionProps = {
  items: WordWithId[];
};

const WordsAccordion = ({ items }: WordsAccordionProps) => {
  const [active, setActive] = useState<string | string[] | undefined>(
    undefined
  );
  return (
    <div className="accordion">
      {items.map((item: WordWithId) => (
        <Collapsible
          key={item.id}
          title={item.word}
          active={active}
          setActive={setActive}
          isMultiActive={false}
        >
          <div>
            <div className="flex justify-between items-center my-2">
              <span className="list-item-title">How to pronounce:</span>
              <PlaySound fileUrl={item.fileUrl} />
            </div>
            <List
              title="Used as parts of speech:"
              items={item.partOfSpeech.map(
                (p) => (p as { id?: string; value: string }).value
              )}
              direction="horizonal"
            />
            <WordInfoAccordion word={item} />
          </div>
        </Collapsible>
      ))}
    </div>
  );
};

export default WordsAccordion;
