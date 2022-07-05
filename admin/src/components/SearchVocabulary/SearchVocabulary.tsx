import { useAppDispatch } from "../../app/hooks";
import { setSearch } from "../../features/search/search-slice";
import AddIcon from "../icons/AddIcon";

function SearchVocabulary() {
  const dispatch = useAppDispatch();
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.currentTarget.value));
  };
  return (
    <div className="flex justify-start items-center">
      <input
        placeholder="Search words...."
        className="p-4 border border-slate-300 h-8 outlined"
        onChange={searchHandler}
      />
      <button className="w-8 h-8 bg-blue-300 ml-[6px] flex justify-center items-center">
        <AddIcon />
      </button>
    </div>
  );
}

export default SearchVocabulary;
