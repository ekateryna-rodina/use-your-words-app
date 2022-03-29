import React, { useState } from "react";
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
  control: any;
  getValues: any;
  active: PronunciationType;
  word: string;
};
const radioLabel = {
  autofill: "Use auto suggestion as media file",
  upload: "Upload media file",
  record: "Record media file",
};
const PronunciationRadio = ({
  register,
  file,
  setFile,
  fileError,
  setFileError,
  control,
  getValues,
  word,
}: PronunciationRadioProps) => {
  const [active, setActive] = useState<PronunciationType>("autofill");
  const options = {
    autofill: () => (
      <AutofillPronunciation
        {...{ active: active === "autofill", register, control }}
      />
    ),
    upload: () => (
      <UploadPronunciation
        {...{
          active: active === "upload",
          file,
          setFile,
          fileError,
          setFileError,
          control,
        }}
      />
    ),
    record: () => (
      <RecordPronunciation
        {...{ active: active === "record", control, file, setFile, word }}
      />
    ),
  };

  const renderPronunciationOptionControl = (o: PronunciationType) => {
    return options[o as keyof typeof options]();
  };

  return (
    <>
      {Object.keys(options).map((o) => (
        <div key={o}>
          <label>
            <input
              type="radio"
              value={o}
              defaultChecked={getValues("pronunciationRadio") === o}
              {...register("pronunciationRadio", {
                onChange: () => setActive(getValues("pronunciationRadio")),
              })}
            />
            {radioLabel[o as keyof typeof radioLabel]}
          </label>
          {renderPronunciationOptionControl(o as PronunciationType)}
        </div>
      ))}
    </>
  );
};

export default PronunciationRadio;
