import React from "react";
import { FileUploader } from "../FileUploader";

type UploadPronunciationProps = {
  disabled: boolean;
  file: File | null;
  setFile: (file: File | null) => void;
  fileError: boolean;
  setFileError: (isError: boolean) => void;
};
const UploadPronunciation = ({
  disabled,
  fileError,
  file,
  setFile,
}: UploadPronunciationProps) => {
  return (
    <>
      <FileUploader
        file={file}
        setFile={setFile}
        error={fileError}
        disabled={disabled}
      />
    </>
  );
};

export default UploadPronunciation;
