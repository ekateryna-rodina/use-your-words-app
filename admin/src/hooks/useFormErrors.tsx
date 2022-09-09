import { useEffect, useState } from "react";

type DeferredPromise<DeferType> = {
  resolve: (value: DeferType) => void;
  reject: (value: unknown) => void;
  promise: Promise<DeferType>;
};

export function useFormErrors(
  errors: string[],
  ref: React.RefObject<HTMLDivElement>
) {
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    if (!Object.keys(errors).length) return;
    const errorsHeight = ref.current?.clientHeight;
    setHeight(errorsHeight ?? 0);
  }, [errors, ref]);
  return height;
}
