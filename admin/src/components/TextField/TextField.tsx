type TextFieldProps = {
  label?: string;
  name?: string;
  validate?: any;
  disabled: boolean;
  onChange?: (target: any) => void;
  styles?: string;
  children?: React.ReactNode;
};
const TextField = ({
  styles,
  label,
  validate,
  name,
  disabled,
  onChange,
  children,
}: TextFieldProps) => {
  const validateForControlled = validate ? { ...validate(name) } : {};
  return (
    <div className="relative">
      {label ? <label htmlFor={name}>{label}</label> : <></>}
      <input
        type="text"
        className={`p-4 border border-slate-300 h-8 outlined ${styles}`}
        aria-label={label}
        id={name}
        disabled={disabled}
        autoComplete="off"
        onChange={onChange}
        {...validateForControlled}
      />
      {children}
    </div>
  );
};

export default TextField;
