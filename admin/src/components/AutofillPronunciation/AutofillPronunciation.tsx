import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "../TextField";

type AutofillPronunciationProps = {
  register: any;
  active: boolean;
  control: any;
};
const AutofillPronunciation = ({
  register,
  active,
  control,
}: AutofillPronunciationProps) => {
  return (
    <>
      <Controller
        name="fileUrl"
        control={control}
        render={() => (
          <TextField
            label=""
            name="fileUrl"
            validate={register}
            disabled={!active}
          />
        )}
      ></Controller>
    </>
  );
};

export default AutofillPronunciation;
