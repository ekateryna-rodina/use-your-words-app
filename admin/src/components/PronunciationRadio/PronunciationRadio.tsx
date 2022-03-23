import React from "react";
import { PronunciationType } from "../../types";
import { AutofillPronunciation } from "../AutofillPronunciation";
import { RecordPronunciation } from "../RecordPronunciation";
import { UploadPronunciation } from "../UploadPronunciation";

type PronunciationRadioProps = {
  register: any;
  file: File | null;
  setFile: (file: File | null) => void;
  fileError: boolean;
  setFileError: (isError: boolean) => void;
  active: PronunciationType;
  setActive: (type: PronunciationType) => void;
};
const PronunciationRadio = ({
  register,
  file,
  setFile,
  fileError,
  setFileError,
  active,
  setActive,
}: PronunciationRadioProps) => {
  const options = {
    autofill: (disabled: boolean) => (
      <AutofillPronunciation validate={register} disabled={disabled} />
    ),
    upload: (disabled: boolean) => (
      <UploadPronunciation
        {...{ disabled, file, setFile, fileError, setFileError }}
      />
    ),
    record: (disabled: boolean) => <RecordPronunciation disabled={disabled} />,
  };

  return (
    <>
      {Object.keys(options).map((o) => (
        <div key={o}>
          <input
            type="radio"
            value={o}
            name="pronunciation"
            id={o}
            checked={active === o}
            onChange={(e) =>
              setActive(e.target.defaultValue as PronunciationType)
            }
          />
          {options[o as keyof typeof options](o !== active)}
        </div>
      ))}
    </>
  );
};

export default PronunciationRadio;
