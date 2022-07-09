import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";

type CollapsibleProps = {
  title: string;
  expanded: string[];
  setExpanded: (expanded: string[]) => void;
  children: React.ReactNode;
};

const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  expanded,
  setExpanded,
  children,
}: CollapsibleProps) => {
  const [maxHeight, setMaxHeight] = useState<string>("max-h-[0px]");
  const { isEdit } = useAppSelector((state) => state.wordDetails);
  const expandHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (expanded.includes(title)) {
      setExpanded(expanded.filter((i) => i !== title));
    } else {
      setExpanded([...expanded, title]);
    }
  };

  const ref = useRef(null);
  useEffect(() => {
    let height = 0;
    if (expanded.includes(title)) {
      height = (ref.current as any).scrollHeight;
    } else {
      height = 0;
    }
    setMaxHeight(`max-h-[${height}px]`);
    console.log(`max-h-[${height}px]`);
    // eslint-disable-next-line
  }, [expanded]);
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <span className="text-lg text-slate-300">{title}</span>
        <button onClick={expandHandler}>
          {expanded.includes(title) ? <ArrowUp /> : <ArrowDown />}
        </button>
      </div>
      <div className={`overflow-hidden ${maxHeight}`}>
        <div ref={ref} className={`p-4 flex flex-col gap-2`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Collapsible);
