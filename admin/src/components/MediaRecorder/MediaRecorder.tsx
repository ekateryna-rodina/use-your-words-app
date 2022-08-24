import { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "../icons/RecordIcon";
import StopIcon from "../icons/StopIcon";

type MediaRecorderProps = {
  disabled: boolean;
  setFile: (file: File | null) => void;
  word: string;
  onChange: (fileName: string) => void;
};
const MediaRecorder = ({
  disabled,
  setFile,
  word,
  onChange,
}: MediaRecorderProps) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: false,
      audio: true,
    });
  const convertToBlob = async () => {
    return await fetch(mediaBlobUrl!).then((response) => response.blob());
  };
  useEffect(() => {
    if (!mediaBlobUrl) return;

    convertToBlob().then((blob: any) => {
      const file = new File([blob], `${word ?? "newWord"}.wav`, {
        type: blob.type,
      });
      onChange(file.name);
      setFile(file);
    });
    // eslint-disable-next-line
  }, [mediaBlobUrl]);
  return (
    <>
      <div className="h-8 flex justify-start items-center ml-[12px] gap-1">
        <div className="w-8">
          {status === "recording" ? (
            <div className="blob"></div>
          ) : (
            <button
              disabled={disabled}
              className="flex justify-center items-center"
              onClick={(e) => {
                e.preventDefault();
                startRecording();
              }}
            >
              <RecordIcon />
            </button>
          )}
        </div>

        <button
          disabled={disabled}
          className="flex justify-center items-center"
          onClick={(e) => {
            e.preventDefault();
            stopRecording();
          }}
        >
          <StopIcon />
        </button>
      </div>
      <audio
        style={{ pointerEvents: disabled ? "none" : "auto" }}
        src={mediaBlobUrl as string}
        controls
        autoPlay
        loop
      />
    </>
  );
};

export default MediaRecorder;
