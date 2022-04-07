import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggle } from "../../features/theme/theme-slice";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";

const Switcher = () => {
  const dispatch = useAppDispatch();
  const { isDark } = useAppSelector((state) => state.theme);
  const toggleMode = () => {
    dispatch(toggle());
  };
  return (
    <div className="flex flex-row items-center">
      <SunIcon fill={isDark ? "fill-light" : "fill-gray-300"} />
      <input
        type="checkbox"
        id="toggle"
        className="hidden"
        onChange={toggleMode}
      />
      <label htmlFor="toggle">
        <div className="w-10 h-6 rounded-full flex items-center bg-gray-300 p-1 mx-1 ease-in duration-200 dark:bg-dark-500">
          <div
            className={`w-4 h-4 bg-gray-100 shadow-md rounded-full ease-in duration-200 ${
              isDark ? "translate-x-4" : ""
            } dark:bg-dark-800`}
          ></div>
        </div>
      </label>
      <MoonIcon fill={isDark ? "fill-light" : "fill-gray-300"} />
    </div>
  );
};

export default Switcher;
