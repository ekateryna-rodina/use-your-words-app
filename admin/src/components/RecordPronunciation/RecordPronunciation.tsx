import React from "react";
import { Controller } from "react-hook-form";
import { MediaRecorder } from "../MediaRecorder";

type RecordPronunciationProps = {
  active: boolean;
  control: any;
  word: string;
  setFile: (file: File | null) => void;
};
const RecordPronunciation = ({
  active,
  control,
  word,
  setFile,
}: RecordPronunciationProps) => {
  return (
    <>
      <Controller
        name="recordPronunciation"
        control={control}
        render={({ field: { onChange } }) => (
          <MediaRecorder
            disabled={!active}
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
