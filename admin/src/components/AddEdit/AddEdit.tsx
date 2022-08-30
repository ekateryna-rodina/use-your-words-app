import { useAppSelector } from "../../app/hooks";
import { ExistingWordEditable } from "../ExistingWordEditable";
// import { ExistingWordEditable } from "../ExistingWordEditable";
import { NewWordEditable } from "../NewWordEditable";

const AddEdit = () => {
  const { currentWordId } = useAppSelector((state) => state.wordDetails);

  if (currentWordId) return <ExistingWordEditable />;
  return <NewWordEditable />;
};

export default AddEdit;
