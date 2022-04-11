import React from "react";
import { useAppSelector } from "../../app/hooks";

const Overlay = () => {
  const { isOpen } = useAppSelector((state) => state.modal);
  const { isDark } = useAppSelector((state) => state.theme);
  const opacity = isOpen ? "opacity-100" : "opacity-0";
  const pointerEvents = !isOpen ? "pointer-events-none" : "pointer-events-auto";
  const bg = isDark ? "bg-dark-800" : "bg-white";
  return (
    <div
      className={`absolute inset-0 ease-in-out duration-300 ${bg} ${opacity} ${pointerEvents}`}
    ></div>
  );
};

export default Overlay;
