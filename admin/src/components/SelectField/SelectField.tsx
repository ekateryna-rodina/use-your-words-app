import { Controller } from "react-hook-form";
import Select from "react-select";
type SelectFieldProps<T> = {
  label: string;
  name: string;
  options: T[];
  validate: any;
  control: any;
  labelClass?: string;
};
const SelectField = <T extends { id: string; value: string }>({
  labelClass,
  label,
  validate,
  name,
  options,
  control,
}: SelectFieldProps<T>) => {
  const selectOptions: { value: string; label: string }[] = options.reduce(
    (acc: { value: string; label: string }[], curr, i) => {
      acc[i] = { value: curr.id, label: curr.value };
      return acc;
    },
    []
  );
  const customStyles = {
    control: (provided: any, state: any) => {
      const outline = state.isFocused ? "1px solid" : "";
      const outlineColor = state.isFocused ? "#93c5fd" : "transparent";
      const border = state.isFocused ? "1px solid transparent" : "";
      return { ...provided, outline, border, outlineColor };
    },
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState, formState }) => (
          <Select
            isMulti
            styles={customStyles}
            ref={field.ref}
            options={selectOptions as []}
            value={options.find((c) => c.value === field.value)}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
    </div>
  );
};

export default SelectField;
