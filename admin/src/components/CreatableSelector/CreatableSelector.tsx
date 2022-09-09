import { ActionMeta, OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
const CreatableSelector = () => {
  const handleChange = (
    newValue: OnChangeValue<{ name: string }, true>,
    actionMeta: ActionMeta<{ name: string }>
  ) => {
    console.log("new value: ", newValue);
    console.log(`action: ${actionMeta.action}`);
  };
  return (
    <CreatableSelect
      isMulti
      onChange={handleChange}
      options={[{ name: "one" }, { name: "tho" }]}
    />
  );
};

export default CreatableSelector;
