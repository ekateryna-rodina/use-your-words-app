import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
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
  const [active, setActive] = useState<PronunciationType>(
    getValues("pronunciationRadio")
  );
  const {
    isAutofill,
    wordDetails: { fileUrl },
  } = useAppSelector((state) => state.addNew);
  const allOptions = {
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
  const [options, setOptions] = useState(allOptions);
  const renderPronunciationOptionControl = (o: PronunciationType) => {
    return options[o as keyof typeof options]();
  };
  useEffect(() => {
    if (isAutofill && fileUrl) {
      setOptions(allOptions);
      return;
    }
    const radioWithoutAutofill = Object.keys(allOptions).reduce(
      (acc: any, curr) => {
        if (curr !== "autofill") {
          acc[curr] = allOptions[curr as keyof typeof allOptions];
        }
        return acc;
      },
      {}
    );
    setOptions(radioWithoutAutofill);
    // eslint-disable-next-line
  }, [isAutofill, fileUrl]);
  return (
    <>
      {Object.keys(options).map((o) => (
        <div key={o} className="mt-[8px]">
          <label>
            <input
              type="radio"
              className="mt-[8px]"
              value={o}
              defaultChecked={active === o}
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
