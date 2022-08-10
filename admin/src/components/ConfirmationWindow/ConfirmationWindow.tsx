import { useAppSelector } from "../../app/hooks";
import { useDeferredPromise } from "../../hooks/useDeferredPromise";

type ConfirmationWindowProps = {
  onConfirm: () => void;
  onCancel: () => void;
};
const ConfirmationWindow = ({
  onConfirm,
  onCancel,
}: ConfirmationWindowProps) => {
  const { isOpen } = useAppSelector((state) => state.confirm);
  const { deferRef } = useDeferredPromise();
  if (!isOpen) return <></>;
  return (
    <div className={`absolute inset-0 w-screen h-screen bg-slate-300/50`}>
      <div className="relative w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-blue-300 bg-white p-4 rounded">
          <div>{"Are you sure???"}</div>
          <div className="flex justify-end items-center gap-4 pt-2">
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationWindow;
