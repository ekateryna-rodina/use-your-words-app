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
  // const [formValues, setFormValues] = useState<FormValue[]>(
  //   formValuesInit.length ? formValuesInit : [{ id: "", value: "" }]
  // );
  // const [error, setError] = useState(false);
  // const onAddNew = (e: FormEvent) => {
  //   // if user tries to add new value but previous input is empty
  //   // if (!formValues[formValues.length - 1].value.length) {
  //   //   e.preventDefault();
  //   //   setError(true);
  //   //   return;
  //   // }
  //   setFormValues([...formValues, { id: "", value: "" }]);
  // };
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  useEffect(() => {
    if (!formValuesInit) return;
    // console.log(formValuesInit);
    console.log("hh", formValuesInit);
    formValuesInit.map((fv) => append({ name, value: fv }));
    // eslint-disable-next-line
  }, [formValuesInit]);

  useEffect(() => {
    console.log("fielsa", fields);
  }, [fields]);
  return (
    <>
      {<span>{`List ${name} for the term`}</span>}
      {fields.map((obj, index) => (
        // <TextArea key={id} name={name} />
        <div key={obj.id}>
          <textarea
            {...register(`${name}.${index}.value`)}
            name={`${name}[${index}].name`}
            // defaultValue={obj[index.toString()]}
          />
          <button type="button" onClick={() => remove(index)}>
            -
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({})}>
        +
      </button>
      {/* {error ? <p>Fill this field first</p> : <></>} */}
      {/* <button onClick={onAddNew}>+</button> */}
    </>
  );
};

export default React.memo(DynamicMultipleTextarea);
