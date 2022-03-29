import React, { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

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
      <p>{status}</p>
      <button
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          startRecording();
        }}
      >
        Start
      </button>
      <button
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          stopRecording();
        }}
      >
        Stop
      </button>
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
