import AddIcon from "../icons/AddIcon";

function SearchVocabulary() {
  return (
    <div className="flex justify-start items-center">
      <input
        placeholder="Search words...."
        className="px-[3px] border border-slate-300 h-8 focus:outline-none focus:drop-shadow-md"
      />
      <button className="w-8 h-8 bg-blue-300 ml-[3px] flex justify-center items-center">
        <AddIcon />
      </button>
    </div>
  );
}

export default SearchVocabulary;
