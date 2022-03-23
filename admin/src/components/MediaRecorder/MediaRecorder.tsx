import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";

type MediaRecorderProps = {
  disabled: boolean;
};
const MediaRecorder = ({ disabled }: MediaRecorderProps) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: false,
      audio: true,
    });
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
