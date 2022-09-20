import Dropzone, { FileRejection } from "react-dropzone";
import { AcceptedMediaFiles } from "../../types";
import ImageRefIcon from "../icons/ImageRefIcon";

type FileUploaderProps = {
  disabled: boolean;
  onChange: (file: File) => void;
  acceptedMediaFiles: AcceptedMediaFiles;
  label: string;
  file: string | File | null;
  error?: boolean;
};
const FileUploader = ({
  disabled,
  onChange,
  label,
  file,
  error,
  acceptedMediaFiles,
}: FileUploaderProps) => {
  const borderColor:
    | "border-emerald-300"
    | "border-red-300"
    | "border-slate-300"
    | "border-slate-300/50" = (file as File)?.name
    ? "border-emerald-300"
    : error
    ? "border-red-300"
    : disabled
    ? "border-slate-300/50"
    : "border-slate-300";

  const renderUpload = () => {
    if (!(file as File)?.name?.length) {
      if (acceptedMediaFiles === AcceptedMediaFiles.Audio) {
        return (
          <p
            style={{
              color: disabled ? "gray" : "blue",
              fontWeight: "bold",
            }}
          >
            {label}
          </p>
        );
      } else {
        return <ImageRefIcon />;
      }
    } else {
      if (acceptedMediaFiles === AcceptedMediaFiles.Audio) {
        return (
          <p style={{ color: "blue", fontWeight: "bold" }}>
            {(file as File)?.name}
          </p>
        );
      } else {
        return (
          <img
            alt=""
            className="max-w-[30px] max-h-[30px]"
            src={URL.createObjectURL(file as Blob)}
            onLoad={() => {
              URL.revokeObjectURL((file as any).preview);
            }}
          />
        );
      }
    }
  };
  return (
    <Dropzone
      onDrop={(acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        onChange(acceptedFiles[0]);
      }}
      multiple={false}
      accept={
        acceptedMediaFiles === AcceptedMediaFiles.Audio ? "audio/*" : "image/*"
      }
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
            className={`border boder-dotted text-center ${borderColor} ${
              acceptedMediaFiles === AcceptedMediaFiles.Audio ? "p-4" : "p-1"
            } ${disabled ? "pointer-events-none" : "pointer-events-auto"}`}
            {...getRootProps()}
          >
            <input {...getInputProps({})} />
            {renderUpload()}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default FileUploader;
