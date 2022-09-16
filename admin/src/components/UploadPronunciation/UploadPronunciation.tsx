import { Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setMediaFile } from "../../features/addNewWord/addnewword-slice";
import { AcceptedMediaFiles } from "../../types";
import { FileUploader } from "../FileUploader";

type UploadPronunciationProps = {
  control: any;
};
const UploadPronunciation = ({ control }: UploadPronunciationProps) => {
  const {
    pronounceFileType,
    media: { file, error },
  } = useAppSelector((state) => state.addNewWord);
  const dispatch = useAppDispatch();
  const fileUploadHandler = (file: File) => {
    dispatch(setMediaFile(file));
  };
  return (
    <>
      <Controller
        name="uploadPronunciation"
        control={control}
        render={({ field: { onChange } }) => (
          <FileUploader
            disabled={pronounceFileType !== "upload"}
            onChange={(file: File) => {
              onChange(file.name);
              fileUploadHandler(file);
            }}
            acceptedMediaFiles={AcceptedMediaFiles.Audio}
            label={"Upload mp3 file"}
            {...{ file, error }}
          />
        )}
      ></Controller>
    </>
  );
};

export default UploadPronunciation;
