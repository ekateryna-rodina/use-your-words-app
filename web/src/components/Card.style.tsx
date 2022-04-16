import React, { useState } from "react";
import { PracticeCardPosition } from "../types";

type CardProps = {
  position: PracticeCardPosition;
  frontCardRef: React.MutableRefObject<HTMLDivElement | null>;
  middleCardRed: React.MutableRefObject<HTMLDivElement | null>;
  children?: React.ReactNode;
};

type Class = "front" | "middle" | "back";
const StyleMap: Record<PracticeCardPosition, Class> = {
  [PracticeCardPosition.Front]: "front",
  [PracticeCardPosition.Middle]: "middle",
  [PracticeCardPosition.Back]: "back",
};

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { position, children, frontCardRef, middleCardRed } = props;
  const [styleClass] = useState<"front" | "middle" | "back">(
    StyleMap[position]
  );
  return (
    <div ref={ref} className={`card ${styleClass}`}>
      {children}
      {/* {frontCardRef === ref || middleCardRed === ref ? children : <></>} */}
    </div>
  );
});

export default Card;
