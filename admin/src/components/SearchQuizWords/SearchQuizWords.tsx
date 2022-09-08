import { useAppDispatch } from "../../app/hooks";
import { setQuizzesSearch } from "../../features/search/search-slice";

const SearchQuizWords = () => {
  const dispatch = useAppDispatch();
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuizzesSearch(e.currentTarget.value));
  };
  return (
    <input
      placeholder="Search quiz words...."
      className="p-4 border border-slate-300 h-8 outlined"
      onChange={searchHandler}
    />
  );
};

export default SearchQuizWords;
