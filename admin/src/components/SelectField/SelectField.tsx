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
        defaultValue={[]}
        render={({ field, fieldState, formState }) => (
          <Select
            isMulti
            styles={customStyles}
            classNamePrefix={"react-select"}
            ref={field.ref}
            value={selectOptions.filter((c) => field.value.includes(c.value))}
            options={selectOptions as []}
            onChange={(val) => {
              field.onChange(val.map((v) => v.value));
            }}
          />
        )}
      />
    </div>
  );
};

export default SelectField;
