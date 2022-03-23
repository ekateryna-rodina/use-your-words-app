import React from "react";
import { TextField } from "../TextField";

type AutofillPronunciationProps = {
  validate: any;
  disabled: boolean;
};
const AutofillPronunciation = ({
  validate,
  disabled,
}: AutofillPronunciationProps) => {
  return (
    <>
      <TextField
        label="Enter mp3 url"
        name="fileUrl"
        validate={validate}
        disabled={disabled}
      />
    </>
  );
};

export default AutofillPronunciation;
