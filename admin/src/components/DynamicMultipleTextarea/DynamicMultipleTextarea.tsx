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
    formValuesInit.map((fv) =>
      append({
        name,
        value: typeof fv === "object" ? fv : { id: "", value: fv },
      })
    );
    // eslint-disable-next-line
  }, [formValuesInit]);

  return (
    <>
      {<span>{`List ${name} for the term`}</span>}
      {fields.map((obj: any, index) => (
        <div key={obj.id}>
          <textarea
            {...register(`${name}.${index}.value.value`)}
            name={`${name}[${index}].name`}
            defaultValue={obj["value"].value}
            onChange={(e) =>
              update(index, {
                name,
                value: {
                  id: obj.id,
                  value: e.target.value,
                },
              })
            }
            autoFocus
            onFocus={function (e) {
              var val = e.target.value;
              e.target.value = "";
              e.target.value = val;
            }}
          />
          <button type="button" onClick={() => remove(index)}>
            -
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          append({ name, value: { id: "idsfhdsiufhisfdh", value: "" } })
        }
      >
        +
      </button>
    </>
  );
};

export default React.memo(DynamicMultipleTextarea);
