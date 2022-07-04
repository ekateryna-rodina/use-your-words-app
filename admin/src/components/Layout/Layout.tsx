import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Layout: React.FC = ({ children }) => {
  const { activeTab } = useAppSelector((state) => state.tabs);
  return (
    <>
      <h2 className="text-lg">Admin panel</h2>
      <ul className="flex flex-row gap-4 mt-[2px]">
        <li>
          <Link
            className={`text-slate-300 ${
              activeTab === "vocabulary" ? "bordered-tab" : ""
            }`}
            to="/vocabulary"
          >
            Vocabulary
          </Link>
        </li>
        <li>
          <Link
            className={`text-slate-300 ${
              activeTab === "quizzes" ? "bordered-tab" : ""
            }`}
            to="/quizzes"
          >
            Quizzes
          </Link>
        </li>
      </ul>
      <main className="mt-8">{children}</main>
    </>
  );
};
export default Layout;
