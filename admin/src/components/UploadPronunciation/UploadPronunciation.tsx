import { Controller } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { FileUploader } from "../FileUploader";

type UploadPronunciationProps = {
  control: any;
  file: File | null;
  setFile: (file: File | null) => void;
  fileError: boolean;
  setFileError: (isError: boolean) => void;
};
const UploadPronunciation = ({
  fileError,
  file,
  setFile,
  control,
}: UploadPronunciationProps) => {
  const { pronounceFileType } = useAppSelector((state) => state.addNew);
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
            disabled={pronounceFileType !== "upload"}
            onChange={onChange}
          />
        )}
      ></Controller>
    </>
  );
};

export default UploadPronunciation;
