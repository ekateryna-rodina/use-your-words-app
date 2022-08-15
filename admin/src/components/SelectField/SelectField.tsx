import { Controller } from "react-hook-form";
import Select from "react-select";
type SelectFieldProps<T> = {
  label: string;
  name: string;
  options: T[];
  validate: any;
  control: any;
};
const SelectField = <T extends { id: string; value: string }>({
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
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState, formState }) => (
          <Select
            isMulti
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
