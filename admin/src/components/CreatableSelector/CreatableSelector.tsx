import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
type CreatableSelectorProps<T> = {
  control: any;
  options: T[];
  name: string;
};
const CreatableSelector = <T extends { label: string; value: string }>({
  control,
  options,
  name,
}: CreatableSelectorProps<T>) => {
  const customStyles = {
    control: (provided: any, state: any) => {
      const outline = state.isFocused ? "1px solid" : "";
      const outlineColor =
        state.isFocused || state.isActive ? "#93c5fd" : "transparent";
      const border = state.isFocused ? "1px solid transparent" : "";
      const maxWidth = "25rem";
      return { ...provided, outline, border, outlineColor, maxWidth };
    },
    menu: (provided: any, state: any) => {
      const maxWidth = "25rem";
      return { ...provided, maxWidth };
    },
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field }) => (
        <CreatableSelect
          isMulti
          styles={customStyles}
          ref={field.ref}
          classNamePrefix={"react-creatable-select"}
          onChange={(val) => {
            field.onChange(val);
          }}
          options={options}
        />
      )}
    />
  );
};

export default CreatableSelector;
