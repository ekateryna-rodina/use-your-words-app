import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useFetchVocabularyQuery } from "../../features/app-api-slice";

const Layout: React.FC = ({ children }) => {
  const { activeTab } = useAppSelector((state) => state.tabs);
  const { data, isLoading } = useFetchVocabularyQuery();
  return (
    <div className="w-[85%] h-full mx-auto my-4">
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

          {isLoading ? (
            <div className="loading ml-[3px]">1</div>
          ) : (
            <div className="count-label">{data?.words.length}</div>
          )}
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
      <main className="mt-8 h-full">{children}</main>
    </div>
  );
};
export default Layout;
