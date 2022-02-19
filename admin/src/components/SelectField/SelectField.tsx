import { ErrorMessage, useField } from "formik";
import React from "react";

type SelectFieldProps = {
  label: string;
  name: string;
  options: string[];
};
const SelectField = ({ label, ...props }: SelectFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <select {...field} {...props} multiple>
        {props.options.map((o) => (
          <option key={o} {...field} {...props} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ErrorMessage name={field.name} />
    </div>
  );
};

export default SelectField;
