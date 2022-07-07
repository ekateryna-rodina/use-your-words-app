import { useEffect, useRef, useState } from "react";
import { FormValue } from "../../types";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";

type CollapsibleProps = {
  title: string;
  items: FormValue[];
  expanded: string[];
  setExpanded: (expanded: string[]) => void;
};

const Collapsible = ({
  title,
  items,
  expanded,
  setExpanded,
}: CollapsibleProps) => {
  const [height, setHeight] = useState<string>("max-h-0");
  const expandHandler = () => {
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
    setHeight(`max-h-[${height}px]`);
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
      <div
        className={`overflow-hidden transition-height duration-150 ease-out ${height}`}
      >
        <div
          ref={ref}
          className={`p-4 flex flex-col gap-2 ${
            expanded.includes(title) ? "" : ""
          }`}
        >
          {items.map((i) => (
            <div key={i.id} className="bordered-paragraph">
              {i.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collapsible;
