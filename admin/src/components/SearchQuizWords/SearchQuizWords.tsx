import { useEffect, useState } from "react";
import { apiSlice } from "../../features/app-api-slice";

const SearchQuizWords = () => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const { data } = apiSlice.endpoints.getQuizzes.useQueryState();
  useEffect(() => {
    if (!searchTerm) return;
    console.log(data);
  }, [searchTerm]);
  return (
    <input
      placeholder="Search quiz words...."
      className="p-4 border border-slate-300 h-8 outlined"
      onChange={(e) => setSearchTerm(e.currentTarget.value)}
    />
  );
};

export default SearchQuizWords;
