import { Controller } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { MediaRecorder } from "../MediaRecorder";

type RecordPronunciationProps = {
  control: any;
  word: string;
};
const RecordPronunciation = ({ control, word }: RecordPronunciationProps) => {
  const { pronounceFileType } = useAppSelector((state) => state.addNewWord);
  return (
    <>
      <Controller
        name="recordPronunciation"
        control={control}
        render={({ field: { onChange } }) => (
          <MediaRecorder
            disabled={pronounceFileType !== "record"}
            word={word}
            onChange={onChange}
          />
        )}
      ></Controller>
    </>
  );
};

export default RecordPronunciation;
