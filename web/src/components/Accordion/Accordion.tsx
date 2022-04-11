import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { Button } from "../Button";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ChevronUpIcon from "../icons/ChevronUpIcon";
import "./Accordion.style.css";

type CollapsibleProps = {
  title: string;
  active: string | undefined;
  setActive: (title: string | undefined) => void;
};

const Collapsible = ({ title, active, setActive }: CollapsibleProps) => {
  const activeClass = active === title ? "active" : "";
  const { isDark } = useAppSelector((state) => state.theme);
  const handler =
    active === title ? () => setActive(undefined) : () => setActive(title);
  return (
    <div className="collapsible">
      <div className="heading noSelect">
        <div className="container w-11/12 mx-auto">
          <div>{title}</div>
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
        <div className="w-11/12 mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
          atque ducimus illum consectetur dolore temporibus ipsa rerum nisi eum
          reiciendis quisquam tenetur pariatur qui excepturi debitis vero,
          distinctio cum doloribus.
        </div>
      </div>
    </div>
  );
};
const Accordion = () => {
  const [active, setActive] = useState<string | undefined>("title1");
  return (
    <div className="accordion">
      <Collapsible title="title1" active={active} setActive={setActive} />
      <Collapsible title="title2" active={active} setActive={setActive} />
      <Collapsible title="title3" active={active} setActive={setActive} />
      <Collapsible title="title4" active={active} setActive={setActive} />
      <Collapsible title="title5" active={active} setActive={setActive} />
    </div>
  );
};

export default Accordion;
