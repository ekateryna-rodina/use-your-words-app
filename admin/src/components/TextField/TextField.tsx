import React from "react";

type TextFieldProps = {
  label?: string;
  name: string;
  validate: any;
};
const TextField = ({ label, validate, name }: TextFieldProps) => {
  return (
    <div>
      {label ? <label htmlFor={name}>{label}</label> : <></>}
      <input
        type="text"
        aria-label={label}
        id={name}
        autoComplete="off"
        {...validate(name)}
      />
    </div>
  );
};

export default TextField;
