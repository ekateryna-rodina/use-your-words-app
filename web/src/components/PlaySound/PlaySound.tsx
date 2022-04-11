import React, { useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import ListenIcon from "../icons/ListenIcon";

type PlaySoundProps = {
  fileUrl: string;
};
const PlaySound = ({ fileUrl }: PlaySoundProps) => {
  const { isDark } = useAppSelector((state) => state.theme);
  const ref = useRef<HTMLAudioElement | null>(null);
  const playSound = () => {
    ref.current?.play();
  };
  return (
    <>
      <audio ref={ref} id="player" src={fileUrl}></audio>
      <div>
        <button onClick={playSound}>
          <ListenIcon fill={"fill-purple"} />
        </button>
      </div>
    </>
  );
};

export default PlaySound;
