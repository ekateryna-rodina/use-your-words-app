import Dropzone, { FileRejection } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setMediaFile } from "../../features/addNew/addnew-slice";

type FileUploaderProps = {
  disabled: boolean;
  onChange: (fileName: string) => void;
};
const FileUploader = ({ disabled, onChange }: FileUploaderProps) => {
  const dispatch = useAppDispatch();
  const {
    media: { file, error },
  } = useAppSelector((state) => state.addNew);
  async function dropFileHandler(
    files: File[],
    rejectedFiles: FileRejection[]
  ) {
    dispatch(setMediaFile(files[0]));
  }
  let maxSize = 5e6;
  return (
    <Dropzone
      onDrop={(acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        dropFileHandler(acceptedFiles, rejectedFiles);
        onChange(acceptedFiles[0].name);
      }}
      maxSize={maxSize}
      multiple={false}
      accept="audio/*"
    >
      {({
        getRootProps,
        getInputProps,
      }: {
        getRootProps: any;
        getInputProps: any;
      }) => (
        <section>
          <div
            style={{
              padding: "1rem",
              border: "1px  solid",
              borderStyle: "dashed",
              textAlign: "center",
              pointerEvents: disabled ? "none" : "auto",
              borderColor: (file as File)?.name
                ? "#6EE7B7"
                : error
                ? "red"
                : disabled
                ? "gray"
                : "rgb(59 130 246 / 0.5)",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps({})} />
            {!(file as File)?.name.length ? (
              <p
                style={{
                  color: disabled ? "gray" : "blue",
                  fontWeight: "bold",
                }}
              >
                Upload mp3 file
              </p>
            ) : (
              <p style={{ color: "blue", fontWeight: "bold" }}>
                {(file as File)?.name}
              </p>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default FileUploader;
