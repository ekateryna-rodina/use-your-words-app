import React from "react";
import Dropzone, { FileRejection } from "react-dropzone";

type FileUploaderProps = {
  setFile: (file: File) => void;
  file: File | null;
  error: boolean;
  disabled: boolean;
};
const FileUploader = ({
  setFile,
  file,
  error,
  disabled,
}: FileUploaderProps) => {
  async function dropFileHandler(
    files: File[],
    rejectedFiles: FileRejection[]
  ) {
    setFile(files[0]);
  }
  let maxSize = 5e6;
  return (
    <Dropzone
      onDrop={(acceptedFiles: File[], rejectedFiles: FileRejection[]) =>
        dropFileHandler(acceptedFiles, rejectedFiles)
      }
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
              borderColor: file?.name
                ? "green"
                : error
                ? "red"
                : disabled
                ? "gray"
                : "blue",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {!file?.name ? (
              <p
                style={{
                  color: disabled ? "gray" : "blue",
                  fontWeight: "bold",
                }}
              >
                Upload mp3 file
              </p>
            ) : (
              <p style={{ color: "blue", fontWeight: "bold" }}>{file.name}</p>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default FileUploader;
