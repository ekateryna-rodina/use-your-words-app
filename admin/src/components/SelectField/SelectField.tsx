import { ErrorMessage, useField } from "formik";
import React from "react";

type SelectFieldProps = {
  label: string;
  name: string;
};
const SelectField = ({ label, ...props }: SelectFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <select {...field} {...props}>
        <option value={1}>verb</option>
        <option value={2}>noun</option>
        <option value={3}>adjec</option>
      </select>
      <ErrorMessage name={field.name} />
    </div>
  );
};

export default SelectField;
