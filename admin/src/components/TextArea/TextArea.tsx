import React from "react";

type TextAreaProps = {
  label?: string;
  name: string;
};
const TextArea = ({ label, name }: TextAreaProps) => {
  return (
    <div>
      {label ? <label htmlFor={name}>{label}</label> : <></>}
      <textarea name={name} autoComplete="off" />
    </div>
  );
};

export default TextArea;
