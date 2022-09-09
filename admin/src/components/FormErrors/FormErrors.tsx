import { forwardRef } from "react";

type FormErrorsProps = {
  errors: string[];
  height: number;
};
const FormErrors = forwardRef<HTMLDivElement, FormErrorsProps>(
  ({ errors, height }, ref) => {
    return (
      <>
        {errors.length ? (
          <div
            className="absolute left-0 flex flex-col"
            style={{ bottom: `-${height}px` }}
            ref={ref}
          >
            {errors.map((err, i) => (
              <small key={err} className="text-red">
                {err}
              </small>
            ))}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
);

export default FormErrors;
