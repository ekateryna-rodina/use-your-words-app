import { useAppSelector } from "../../app/hooks";
import { useFetchVocabularyQuery } from "../../features/app-api-slice";
import { PartOfSpeech, WordWithId } from "../../types";
import { Editable } from "../Editable";

type AddEditProps = {
  partsOfSpeech: PartOfSpeech[];
};
const AddEdit = ({ partsOfSpeech }: AddEditProps) => {
  const { word, isNew } = useAppSelector((state) => state.addNew);
  const { currentWordId, isEdit } = useAppSelector(
    (state) => state.wordDetails
  );
  const fromResult = useFetchVocabularyQuery(undefined, {
    selectFromResult: ({ isSuccess, data }) => ({
      isSuccess,
      data: data,
    }),
  });
  const currentWord = fromResult.data?.words.filter(
    (w) => w.id === currentWordId
  )[0] as WordWithId;

  if (currentWordId)
    return <Editable word={currentWord} isEdit={isEdit} isNew={isNew} />;
  if (isNew)
    return (
      <Editable
        word={word}
        isEdit={true}
        isNew={isNew}
        partsOfSpeech={partsOfSpeech}
      />
    );
  return <></>;
};

export default AddEdit;
