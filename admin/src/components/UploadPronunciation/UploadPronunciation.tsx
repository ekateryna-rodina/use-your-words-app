import { Controller } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { FileUploader } from "../FileUploader";

type UploadPronunciationProps = {
  control: any;
};
const UploadPronunciation = ({ control }: UploadPronunciationProps) => {
  const { pronounceFileType } = useAppSelector((state) => state.addNewWord);

  return (
    <>
      <Controller
        name="uploadPronunciation"
        control={control}
        render={({ field: { onChange } }) => (
          <FileUploader
            disabled={pronounceFileType !== "upload"}
            onChange={onChange}
          />
        )}
      ></Controller>
    </>
  );
};

export default UploadPronunciation;
