import { useCallback, useRef } from "react";
import { useAppDispatch } from "../app/hooks";
import { toggleConfirm } from "../features/confirm/confirm-slice";

export function useConfirm(Component: any) {
  const dispatch = useAppDispatch();
  const resolve = useRef<Function>((ok: boolean) => {});

  const show: () => Promise<boolean> = useCallback(() => {
    return new Promise((ok) => {
      /* @ts-ignore */
      resolve.current = ok;
      dispatch(toggleConfirm(true));
    });
  }, []);

  function componentWrap(): JSX.Element {
    return (
      <Component
        onCancel={() => {
          /* @ts-ignore */
          resolve.current(false);
          dispatch(toggleConfirm(false));
        }}
        onConfirm={() => {
          /* @ts-ignore */
          resolve.current(true);
          dispatch(toggleConfirm(false));
        }}
      />
    );
  }

  return [componentWrap, show];
}
