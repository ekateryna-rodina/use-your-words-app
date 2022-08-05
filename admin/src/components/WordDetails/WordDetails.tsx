import { useAppSelector } from "../../app/hooks";
import { useFetchVocabularyQuery } from "../../features/app-api-slice";
import { WordWithId } from "../../types";
import { Editable } from "../Editable";
import ListenIcon from "../icons/ListenIcon";

const WordDetails = () => {
  const { currentWordId } = useAppSelector((state) => state.wordDetails);
  const fromResult = useFetchVocabularyQuery(undefined, {
    selectFromResult: ({ isSuccess, data }) => ({
      isSuccess,
      data: data,
      // data: data?.words,
    }),
  });
  const currentWord = fromResult.data?.words.filter(
    (w) => w.id === currentWordId
  )[0] as WordWithId;
  const { word } = currentWord;

  return (
    <div className="relative">
      <div className="h-12">
        {/*  */}
        <div className="absolute top-0 left-0 flex justify-start items-center gap-4 my-0 ">
          <span className="text-2xl font-bold">
            {word[0].toUpperCase() + word.slice(1)}
          </span>
          <button>
            <ListenIcon />
          </button>
        </div>
      </div>
      <Editable />
    </div>
  );
};

export default WordDetails;
