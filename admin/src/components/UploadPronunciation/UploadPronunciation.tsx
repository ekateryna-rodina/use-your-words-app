import React from "react";
import { Controller } from "react-hook-form";
import { FileUploader } from "../FileUploader";

type UploadPronunciationProps = {
  control: any;
  active: boolean;
  file: File | null;
  setFile: (file: File | null) => void;
  fileError: boolean;
  setFileError: (isError: boolean) => void;
};
const UploadPronunciation = ({
  active,
  fileError,
  file,
  setFile,
  control,
}: UploadPronunciationProps) => {
  return (
    <>
      <Controller
        name="uploadPronunciation"
        control={control}
        render={({ field: { onChange } }) => (
          <FileUploader
            file={file}
            setFile={setFile}
            error={fileError}
            disabled={!active}
            onChange={onChange}
          />
        )}
      ></Controller>
    </>
  );
};

export default UploadPronunciation;
