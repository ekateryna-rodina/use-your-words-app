import { useAppDispatch } from "../../app/hooks";
import { setWordsSearch } from "../../features/search/search-slice";

function SearchVocabulary() {
  const dispatch = useAppDispatch();
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setWordsSearch(e.currentTarget.value));
  };
  return (
    <input
      placeholder="Search words...."
      className="p-4 border border-slate-300 h-8 outlined"
      onChange={searchHandler}
    />
  );
}

export default SearchVocabulary;
