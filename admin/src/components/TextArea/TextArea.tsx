import { ErrorMessage, useField } from "formik";
import React from "react";

type TextAreaProps = {
  label: string;
  name: string;
};
const TextArea = ({ label, ...props }: TextAreaProps) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <textarea {...field} {...props} autoComplete="off" />
      <ErrorMessage name={field.name} />
    </div>
  );
};

export default TextArea;
