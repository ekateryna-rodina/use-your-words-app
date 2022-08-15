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
        className="p-4 border border-slate-300 h-8 outlined"
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
