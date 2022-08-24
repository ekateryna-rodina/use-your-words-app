import { Controller } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { MediaRecorder } from "../MediaRecorder";

type RecordPronunciationProps = {
  control: any;
  word: string;
  setFile: (file: File | null) => void;
};
const RecordPronunciation = ({
  control,
  word,
  setFile,
}: RecordPronunciationProps) => {
  const { pronounceFileType } = useAppSelector((state) => state.addNew);
  return (
    <>
      <Controller
        name="recordPronunciation"
        control={control}
        render={({ field: { onChange } }) => (
          <MediaRecorder
            disabled={pronounceFileType !== "record"}
            setFile={setFile}
            word={word}
            onChange={onChange}
          />
        )}
      ></Controller>
    </>
  );
};

export default RecordPronunciation;
