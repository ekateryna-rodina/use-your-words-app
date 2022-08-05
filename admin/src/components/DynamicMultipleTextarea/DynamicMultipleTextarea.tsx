import React, { FormEvent } from "react";
import { useFieldArray } from "react-hook-form";
import { FormValue } from "../../types/";
import AddIcon from "../icons/AddIcon";
import MinusIcon from "../icons/MinusIcon";

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
  const appendHandler = (e: FormEvent) => {
    e.preventDefault();
    append({ name, id: "", value: "" });
  };
  return (
    <>
      {fields.map((obj: any, index) => (
        <div key={obj.id} className="flex justify-between items-center">
          <textarea
            {...register(`${name}.${index}.value`)}
            name={`${name}[${index}].name`}
            defaultValue={obj["value"].value}
            className="w-[calc(100%-2rem)] p-4 outline-blue-300"
            onChange={(e) =>
              update(index, {
                name,

                id: obj.id,
                value: e.target.value,
              })
            }
            autoFocus
            onFocus={function (e) {
              var val = e.target.value;
              e.target.value = "";
              e.target.value = val;
            }}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="flex justify-center items-center"
          >
            <MinusIcon />
          </button>
        </div>
      ))}

      <button
        onClick={appendHandler}
        className="w-8 h-8 bg-blue-300 flex justify-center items-center"
      >
        <AddIcon />
      </button>
    </>
  );
};

export default React.memo(DynamicMultipleTextarea);
