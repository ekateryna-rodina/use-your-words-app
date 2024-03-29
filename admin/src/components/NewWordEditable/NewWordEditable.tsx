import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  reset as resetWord,
  setAutofillError,
  setIsAutofill,
  setPronounceType,
  setWord,
  setWordDetails,
} from "../../features/addNewWord/addnewword-slice";
import { apiSlice, useAddNewWordMutation } from "../../features/app-api-slice";
import { setLoading } from "../../features/loading/loading-slice";
import { useFormErrors } from "../../hooks/useFormErrors";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { addWordSchema } from "../../schema/addWordSchema";
import { FormValue, PartOfSpeech, Word } from "../../types";
import { submitFileToStorage } from "../../utils/cloudinary";
import { AutofillButton } from "../AutofillButton";
import { Collapsible } from "../Collapsible";
import { DynamicMultipleTextarea } from "../DynamicMultipleTextarea";
import { FormErrors } from "../FormErrors";
import CloseIcon from "../icons/CloseIcon";
import SaveIcon from "../icons/SaveIcon";
import { PronunciationRadio } from "../PronunciationRadio";
import { SelectField } from "../SelectField";

const NewWordEditable = () => {
  const {
    wordDetails,
    word,
    isAutofillError,
    partsOfSpeech,
    media: { file, error: fileError },
  } = useAppSelector((state) => state.addNewWord);
  const { isLoading } = useAppSelector((state) => state.loading);
  const resolver = useYupValidationResolver(addWordSchema);
  const [trigger, result] = apiSlice.endpoints.autofill.useLazyQuery();
  const [saveNewWord] = useAddNewWordMutation();
  const [expanded, setExpanded] = useState<string[]>([]);
  const autofillHandler = async (e: FormEvent) => {
    e.preventDefault();
    trigger(word, true);
  };
  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver,
    defaultValues: useMemo(() => {
      return {
        pronunciationRadio: "upload",
        meanings: wordDetails.meanings.map((m: FormValue | string) => {
          return { ...(m as FormValue), name: "meanings" };
        }),
        phrases: wordDetails.phrases.map((p: FormValue | string) => {
          return { ...(p as FormValue), name: "phrases" };
        }),
        synonyms: wordDetails.synonyms.map((s: FormValue | string) => {
          return { ...(s as FormValue), name: "synonyms" };
        }),
        antonyms: wordDetails.antonyms.map((a: FormValue | string) => {
          return { ...(a as FormValue), name: "antonyms" };
        }),
      };
    }, [wordDetails]),
  });
  const errorsRef = useRef<HTMLDivElement>(null);
  const renderWordInfo = [
    {
      title: "Definitions",
      name: "meanings",
    },
    { title: "Examples", name: "phrases" },
    { title: "Synonyms", name: "synonyms" },
    { title: "Antonyms", name: "antonyms" },
  ];
  const dispatch = useAppDispatch();
  const onNewWordEnterHandler = (word: string) => {
    dispatch(setWord(word));
    dispatch(setAutofillError(false));
  };
  const onSaveWordHandler = async (values: any) => {
    let fileUrl = getValues("fileUrl");
    dispatch(setLoading(true));
    if (["upload", "record"].includes(getValues("pronunciationRadio"))) {
      fileUrl = await submitFileToStorage(file as File | Blob);
    }
    saveNewWord({ ...values, fileUrl });
    dispatch(setLoading(false));
  };
  const resetWordHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetWord(true));
    reset();
  };

  const errorsHeight = useFormErrors(
    Object.values(errors).map((v: any) => v.message),
    errorsRef
  );
  useEffect(() => {
    if (wordDetails.word && wordDetails.word !== word) {
      // reset autofill state
      dispatch(setIsAutofill(false));
      dispatch(setWordDetails(false));
    }

    // eslint-disable-next-line
  }, [word, wordDetails]);

  useEffect(() => {
    if (!wordDetails.word) {
      // reset form fields
    } else {
      // set form fields
      if (wordDetails.fileUrl) {
        setValue("fileUrl", wordDetails.fileUrl);
        setValue("pronunciationRadio", "autofill");
        dispatch(setPronounceType(getValues("pronunciationRadio")));
      }
      if (wordDetails.partOfSpeech.length) {
        const parts: string[] = partsOfSpeech
          ?.filter((p) =>
            (wordDetails.partOfSpeech as string[]).includes(
              (p as FormValue).value
            )
          )
          .map((p) => p.id) as string[];
        setValue("partOfSpeech", parts);
      }
      setValue(
        "meanings",
        wordDetails.meanings.map((m: FormValue | string) => {
          return { ...(m as FormValue), name: "meanings" };
        })
      );
      setValue(
        "synonyms",
        wordDetails.synonyms.map((m: FormValue | string) => {
          return { ...(m as FormValue), name: "synonyms" };
        })
      );
      setValue(
        "antonyms",
        wordDetails.antonyms.map((m: FormValue | string) => {
          return { ...(m as FormValue), name: "antonyms" };
        })
      );

      setValue(
        "phrases",
        wordDetails.phrases.map((m: FormValue | string) => {
          return { ...(m as FormValue), name: "phrases" };
        })
      );
    }
    // eslint-disable-next-line
  }, [wordDetails]);
  useEffect(() => {
    if (result.isUninitialized || result.isLoading) return;
    if (result.isError) {
      dispatch(setAutofillError(true));
      return;
    }
    const autofillWord = result.data?.wordInfo as Word;
    dispatch(setWordDetails(autofillWord));
    dispatch(setIsAutofill(true));
    // eslint-disable-next-line
  }, [result]);

  return (
    <div className="modal-container">
      <form
        onSubmit={handleSubmit(
          (data) => onSaveWordHandler(data),
          (e) => {
            console.log(e);
          }
        )}
      >
        <div className="relative w-full flex justify-start items-center gap-2">
          <div className="relative w-[60%]">
            <input
              type="text"
              className="w-full"
              placeholder="Type new word..."
              {...register("word", {
                onChange: (e) => {
                  onNewWordEnterHandler(e.currentTarget.value);
                },
              })}
            />
            <div className="absolute top-[50%] right-[10px] -translate-y-1/2">
              <button
                onClick={resetWordHandler}
                className="flex justify-center items-center"
              >
                <CloseIcon size={10} />
              </button>
            </div>
          </div>
          {isAutofillError ? (
            <small className="text-red absolute left-0 -bottom-[20px]">
              Could not fetch information about this word
            </small>
          ) : (
            <></>
          )}

          <FormErrors
            errors={Object.values(errors).map((v: any) => v.message)}
            height={errorsHeight}
            ref={errorsRef}
          />
          <AutofillButton
            onClickHandler={autofillHandler}
            isLoading={result.isLoading}
          />
          <div className="relative w-8 h-8">
            <input
              type="submit"
              className="bg-emerald-300 w-full h-full"
              value=""
            />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center">
              {isLoading ? <div className="loading"></div> : <SaveIcon />}
            </div>
          </div>
        </div>
        <div
          className={`word-details-container ${
            isAutofillError ? "mt-[8px]" : ""
          }`}
        >
          <div
            style={{
              marginTop: `calc(8px + ${errorsHeight}px)`,
            }}
          >
            <SelectField
              labelClass="text-xl text-slate-300"
              label="Parts of speech"
              validate={register}
              name="partOfSpeech"
              options={partsOfSpeech as PartOfSpeech[]}
              control={control}
            />
          </div>
          <div className="mt-4">
            <span className="text-xl text-slate-300">Pronounciation file</span>
            <PronunciationRadio
              {...{
                register,
                active: getValues("pronunciationRadio"),
                control,
                getValues,
                word: getValues("word"),
              }}
            />
          </div>

          {renderWordInfo.map((d) => (
            <Collapsible
              key={d.title}
              title={d.title}
              {...{ expanded, setExpanded }}
            >
              <DynamicMultipleTextarea
                name={d.name}
                control={control}
                register={register}
              />
            </Collapsible>
          ))}
        </div>
      </form>
    </div>
  );
};

export default NewWordEditable;
