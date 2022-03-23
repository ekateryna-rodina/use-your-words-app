import React from "react";

type TextFieldProps = {
  label?: string;
  name: string;
  validate: any;
  disabled: boolean;
};
const TextField = ({ label, validate, name, disabled }: TextFieldProps) => {
  return (
    <div>
      {label ? <label htmlFor={name}>{label}</label> : <></>}
      <input
        type="text"
        aria-label={label}
        id={name}
        disabled={disabled}
        autoComplete="off"
        {...validate(name)}
      />
    </div>
  );
};

export default TextField;
