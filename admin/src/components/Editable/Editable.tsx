import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setAutofillError,
  setIsAutofill,
  setPronounceType,
  setWord,
  setWordDetails,
} from "../../features/addNew/addnew-slice";
import { useUpdateWordMutation } from "../../features/app-api-slice";
import { setEditMode } from "../../features/wordDetails/worddetails-slice";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { editWordSchema } from "../../schema/editWordSchema";
import { FormValue, PartOfSpeech, Word, WordWithId } from "../../types";
import { Collapsible } from "../Collapsible";
import { DynamicMultipleTextarea } from "../DynamicMultipleTextarea";
import CloseIcon from "../icons/CloseIcon";
import ListenIcon from "../icons/ListenIcon";
import { ModalButtonPanel } from "../ModalButtonPanel";
import { PronunciationRadio } from "../PronunciationRadio";
import { SelectField } from "../SelectField";

const Editable = ({
  word: wordInfo,
  isEdit,
  isNew,
  partsOfSpeech,
}: {
  word: Word | WordWithId;
  isEdit: boolean;
  isNew: boolean;
  partsOfSpeech?: PartOfSpeech[];
}) => {
  const { meanings, phrases, synonyms, antonyms } = wordInfo;
  const [expanded, setExpanded] = useState<string[]>([]);
  const resolver = useYupValidationResolver(editWordSchema);
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const [updateWord] = useUpdateWordMutation();
  const [fileError, setFileError] = useState<boolean>(false);
  const {
    word,
    wordDetails: wordAutofill,
    isAutofillError,
  } = useAppSelector((state) => state.addNew);
  const {
    handleSubmit,
    register,
    reset,
    control,
    getValues,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<any>({
    resolver,
    defaultValues: useMemo(() => {
      return {
        pronunciationRadio: "upload",
        meanings: meanings.map((m: FormValue | string) => {
          return { ...(m as FormValue), name: "meanings" };
        }),
        phrases: phrases.map((p: FormValue | string) => {
          return { ...(p as FormValue), name: "phrases" };
        }),
        synonyms: synonyms.map((s: FormValue | string) => {
          return { ...(s as FormValue), name: "synonyms" };
        }),
        antonyms: antonyms.map((a: FormValue | string) => {
          return { ...(a as FormValue), name: "antonyms" };
        }),
      };
    }, [meanings, phrases, synonyms, antonyms]),
  });

  const onSaveWordHandler = async (values: any) => {
    updateWord({ ...values, id: (wordInfo as WordWithId).id });
    dispatch(setEditMode(false));
  };
  const onNewWordEnterHandler = (word: string) => {
    dispatch(setWord(word));
    dispatch(setAutofillError(false));
  };
  const resetWordHandler = () => {
    dispatch(setWord(""));
    dispatch(setAutofillError(false));
    dispatch(setIsAutofill(false));
    dispatch(setWordDetails(false));
    resetField("word");
  };
  const renderWordInfo = [
    {
      title: "Definitions",
      name: "meanings",
      items: wordInfo?.meanings,
    },
    { title: "Examples", name: "phrases", items: wordInfo?.phrases },
    { title: "Synonyms", name: "synonyms", items: wordInfo?.synonyms },
    { title: "Antonyms", name: "antonyms", items: wordInfo?.antonyms },
  ];
  useEffect(() => {
    reset({ meanings, phrases, synonyms, antonyms });
    // eslint-disable-next-line
  }, [isEdit]);
  useEffect(() => {
    if (wordAutofill.word && wordAutofill.word !== word) {
      // reset autofill state
      dispatch(setIsAutofill(false));
      dispatch(setWordDetails(false));
    }

    // eslint-disable-next-line
  }, [word, wordAutofill]);
  useEffect(() => {
    if (!wordAutofill.word) {
      // reset form fields
    } else {
      // set form fields
      if (wordAutofill.fileUrl) {
        setValue("fileUrl", wordAutofill.fileUrl);
        setValue("pronunciationRadio", "autofill");
        dispatch(setPronounceType(getValues("pronunciationRadio")));
      }
      if (wordAutofill.partOfSpeech.length) {
        const parts: string[] = partsOfSpeech
          ?.filter((p) =>
            (wordAutofill.partOfSpeech as string[]).includes(
              (p as FormValue).value
            )
          )
          .map((p) => p.id) as string[];
        setValue("partOfSpeech", parts);
      }
    }
    // eslint-disable-next-line
  }, [wordAutofill]);
  return (
    <div className="relative">
      <div className="h-12">
        <div className="absolute top-0 left-0 right-0 flex justify-start items-center gap-4 my-0">
          {!isNew ? (
            <span className="text-2xl font-bold">
              {wordInfo.word[0].toUpperCase() + wordInfo.word.slice(1)}
            </span>
          ) : (
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  className="w-[60%]"
                  placeholder="Type new word..."
                  {...register("word", {
                    onChange: (e) => {
                      onNewWordEnterHandler(e.currentTarget.value);
                    },
                  })}
                />
                <div className="absolute top-[50%] right-[calc(40%+10px)] -translate-y-1/2">
                  <button
                    onClick={resetWordHandler}
                    className="flex justify-center items-center"
                  >
                    <CloseIcon size={10} />
                  </button>
                </div>
              </div>

              {isAutofillError ? (
                <small className="text-red">
                  Could not fetch information about this word
                </small>
              ) : (
                <></>
              )}
            </div>
          )}
          {!isNew ?? (
            <button>
              <ListenIcon />
            </button>
          )}
        </div>
      </div>
      <div className="h-full">
        <form
          className="mt-4"
          onSubmit={handleSubmit(
            (data) => onSaveWordHandler(data),
            (e) => {
              console.log(e);
            }
          )}
        >
          {!isNew ? (
            <div className="bordered-paragraph mt-4">
              {wordInfo.partOfSpeech
                .map((p) => (p as FormValue).value)
                .join(", ")}
            </div>
          ) : (
            <SelectField
              labelClass="text-xl text-slate-300"
              label="Parts of speech"
              validate={register}
              name="partOfSpeech"
              options={partsOfSpeech as PartOfSpeech[]}
              control={control}
            />
          )}
          {isNew ? (
            <div className="mt-4">
              <span className="text-xl text-slate-300">
                Pronounciation file
              </span>
              <PronunciationRadio
                {...{
                  register,
                  file,
                  setFile,
                  fileError,
                  setFileError,
                  active: getValues("pronunciationRadio"),
                  control,
                  getValues,
                  word: getValues("word"),
                }}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="overflow-y-auto max-h-[600px] pr-4">
            {renderWordInfo.map((d) => (
              <Collapsible
                key={d.title}
                title={d.title}
                {...{ expanded, setExpanded }}
              >
                {wordInfo && isEdit ? (
                  <>
                    <DynamicMultipleTextarea
                      name={d.name}
                      formValuesInit={d.items}
                      control={control}
                      register={register}
                    />
                  </>
                ) : (
                  <>
                    {d.items?.map((i) => (
                      <div
                        key={(i as FormValue).id}
                        className="bordered-paragraph"
                      >
                        {(i as FormValue).value}
                      </div>
                    ))}
                  </>
                )}
              </Collapsible>
            ))}
          </div>
          <ModalButtonPanel isNew={isNew} />
        </form>
      </div>
    </div>
  );
};

export default Editable;
