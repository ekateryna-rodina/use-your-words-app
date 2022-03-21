import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { FormValue } from "../../types/Word";

type DynamicMultipleTextareaProps = {
  name: string;
  formValuesInit?: FormValue[] | string[];
  control: any;
  register: any;
};

const DynamicMultipleTextarea = ({
  name,
  formValuesInit,
  control,
  register,
}: DynamicMultipleTextareaProps) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name,
  });
  useEffect(() => {
    if (!formValuesInit) return;
    formValuesInit.map((fv) => append({ name, value: fv }));
    // eslint-disable-next-line
  }, [formValuesInit]);

  return (
    <>
      {<span>{`List ${name} for the term`}</span>}
      {fields.map((obj, index) => (
        <div key={obj.id}>
          <textarea
            {...register(`${name}.${index}.value.value`)}
            name={`${name}[${index}].name`}
            onChange={(e) => {
              update(index, {
                name,
                value: { id: obj.id, value: e.target.value },
              });
            }}
            defaultValue={`${name}.${index}.value.value`}
            autoFocus
          />
          <button type="button" onClick={() => remove(index)}>
            -
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ name, value: { id: "", value: "" } })}
      >
        +
      </button>
    </>
  );
};

export default React.memo(DynamicMultipleTextarea);
