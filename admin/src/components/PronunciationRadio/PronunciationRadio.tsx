import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPronounceType } from "../../features/addNewWord/addnewword-slice";
import { PronunciationType } from "../../types";
import { AutofillPronunciation } from "../AutofillPronunciation";
import { RecordPronunciation } from "../RecordPronunciation";
import { UploadPronunciation } from "../UploadPronunciation";

type PronunciationRadioProps = {
  register: any;
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
  control,
  getValues,
  word,
  active,
}: PronunciationRadioProps) => {
  const {
    isAutofill,
    wordDetails: { fileUrl },
  } = useAppSelector((state) => state.addNewWord);
  const dispatch = useAppDispatch();
  const allOptions = {
    autofill: () => <AutofillPronunciation {...{ register, control }} />,
    upload: () => (
      <UploadPronunciation
        {...{
          control,
        }}
      />
    ),
    record: () => (
      <RecordPronunciation
        {...{
          control,
          word,
        }}
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
              className="mt-[8px] mr-[5px]"
              value={o}
              defaultChecked={active === o}
              {...register("pronunciationRadio", {
                onChange: () => {
                  dispatch(setPronounceType(getValues("pronunciationRadio")));
                },
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
