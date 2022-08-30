import { Controller } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { TextField } from "../TextField";

type AutofillPronunciationProps = {
  register: any;
  control: any;
};
const AutofillPronunciation = ({
  register,
  control,
}: AutofillPronunciationProps) => {
  const { pronounceFileType } = useAppSelector((state) => state.addNewWord);
  return (
    <>
      <Controller
        name="fileUrl"
        control={control}
        render={() => (
          <TextField
            label=""
            styles="w-full"
            name="fileUrl"
            validate={register}
            disabled={pronounceFileType !== "autofill"}
          />
        )}
      ></Controller>
    </>
  );
};

export default AutofillPronunciation;
