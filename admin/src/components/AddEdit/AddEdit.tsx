import { useAppSelector } from "../../app/hooks";
import { PartOfSpeech } from "../../types";
import { ExistingWordEditable } from "../ExistingWordEditable";
// import { ExistingWordEditable } from "../ExistingWordEditable";
import { NewWordEditable } from "../NewWordEditable";

type AddEditProps = {
  partsOfSpeech: PartOfSpeech[];
};
const AddEdit = ({ partsOfSpeech }: AddEditProps) => {
  const { currentWordId } = useAppSelector((state) => state.wordDetails);

  if (currentWordId) return <ExistingWordEditable />;
  return <NewWordEditable partsOfSpeech={partsOfSpeech} />;
};

export default AddEdit;
