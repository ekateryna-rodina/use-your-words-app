import React from "react";
import { PartOfSpeech } from "../../types/";

type SelectFieldProps = {
  label: string;
  name: string;
  options: PartOfSpeech[];
  validate: any;
  control: any;
};
const SelectField = ({
  label,
  validate,
  name,
  options,
  control,
}: SelectFieldProps) => {
  console.log(options);
  return (
    <div>
      <label htmlFor={name}>{label}</label>

      <select multiple {...validate(name)}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
