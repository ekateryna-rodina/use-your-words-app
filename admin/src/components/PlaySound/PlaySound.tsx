import { useRef } from "react";
import ListenIcon from "../icons/ListenIcon";

type PlaySoundProps = {
  fileUrl: string;
};
const PlaySound = ({ fileUrl }: PlaySoundProps) => {
  const ref = useRef<HTMLAudioElement | null>(null);
  const playSound = () => {
    ref.current?.play();
  };
  return (
    <>
      <audio ref={ref} id="player" src={fileUrl}></audio>
      <div>
        <button
          onClick={playSound}
          className="flex justify-center items-center"
        >
          <ListenIcon />
        </button>
      </div>
    </>
  );
};

export default PlaySound;
