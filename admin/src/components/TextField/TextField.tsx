type TextFieldProps = {
  label?: string;
  name: string;
  validate?: any;
  disabled: boolean;
  onChange?: (target: any) => void;
};
const TextField = ({
  label,
  validate,
  name,
  disabled,
  onChange,
}: TextFieldProps) => {
  const validateForControlled = validate ? { ...validate(name) } : {};
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
        onChange={onChange}
        {...validateForControlled}
      />
    </div>
  );
};

export default TextField;
