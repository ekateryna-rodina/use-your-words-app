import React from "react";
import { MediaRecorder } from "../MediaRecorder";

type RecordPronunciationProps = {
  disabled: boolean;
};
const RecordPronunciation = ({ disabled }: RecordPronunciationProps) => {
  return (
    <>
      <MediaRecorder disabled={disabled} />
    </>
  );
};

export default RecordPronunciation;
