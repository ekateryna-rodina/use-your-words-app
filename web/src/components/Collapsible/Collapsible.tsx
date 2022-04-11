import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Button } from "../Button";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ChevronUpIcon from "../icons/ChevronUpIcon";
import "./Collapsible.style.css";

type CollapsibleProps = {
  title: string;
  active: string | undefined | string[];
  setActive: (title: string | string[] | undefined) => void;
  isMultiActive: boolean;
  children?: React.ReactNode;
  titleStyle?: string;
};

const Collapsible = ({
  title,
  active,
  setActive,
  children,
  isMultiActive,
  titleStyle,
}: CollapsibleProps) => {
  const activeClass =
    active === title || (Array.isArray(active) && active.includes(title))
      ? "active"
      : "";
  const { isDark } = useAppSelector((state) => state.theme);
  const handlerSingleActive =
    active === title ? () => setActive(undefined) : () => setActive(title);
  const handlerMultiactive =
    Array.isArray(active) && active.includes(title)
      ? () => setActive(active.filter((a) => a !== title))
      : () => setActive([...(active as []), title]);
  const handler = isMultiActive ? handlerMultiactive : handlerSingleActive;
  return (
    <div className="collapsible">
      <div className="heading noSelect">
        <div className="container w-11/12 mx-auto">
          <div className={titleStyle}>{title}</div>
          <Button
            handler={handler}
            className={"w-5 h-5 bg-transparent focus:outline-none"}
          >
            {active === title ? (
              <ChevronUpIcon
                stroke={isDark ? "stroke-dark-500" : "stroke-gray-300"}
              />
            ) : (
              <ChevronDownIcon
                stroke={isDark ? "stroke-dark-500" : "stroke-gray-300"}
              />
            )}
          </Button>
        </div>
      </div>
      <div className={`content ${activeClass}`}>
        <div className="w-11/12 mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
