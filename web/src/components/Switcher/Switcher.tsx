import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggle } from "../../features/theme/theme-slice";

const Switcher = () => {
  const dispatch = useAppDispatch();
  const { isDark } = useAppSelector((state) => state.theme);
  const toggleMode = () => {
    dispatch(toggle());
  };
  return (
    <>
      <input
        type="checkbox"
        id="toggle"
        className="hidden"
        onChange={toggleMode}
      />
      <label htmlFor="toggle">
        <div className="w-10 h-6 rounded-full flex items-center bg-gray-300 p-1 dark:bg-dark-800">
          <div
            className={`w-4 h-4 bg-gray-100 shadow-md rounded-full ease-in duration-200 ${
              isDark ? "translate-x-4" : ""
            } dark:bg-dark-700`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default Switcher;
