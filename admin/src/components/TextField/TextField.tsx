import { ErrorMessage, useField } from "formik";
import React from "react";

type TextFieldProps = {
  label: string;
  name: string;
};
const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input
        type="text"
        {...field}
        {...props}
        autoComplete="off"
        className={`text-field ${
          meta.touched && meta.error ? "text-fiels--error" : ""
        }`}
      />
      <ErrorMessage name={field.name} />
    </div>
  );
};

export default TextField;
