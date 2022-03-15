import React from "react";

type SelectFieldProps = {
  label: string;
  name: string;
  options: string[];
  validate: any;
};
const SelectField = ({ label, validate, name, options }: SelectFieldProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} multiple {...validate(name)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
