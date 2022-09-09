import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { WordWithId } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  useFetchVocabularyQuery,
  useUpdateWordMutation,
} from "../../features/app-api-slice";
import { setEditMode } from "../../features/wordDetails/worddetails-slice";
import { useFormErrors } from "../../hooks/useFormErrors";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { editWordSchema } from "../../schema/editWordSchema";
import { FormValue } from "../../types";
import { Collapsible } from "../Collapsible";
import { DynamicMultipleTextarea } from "../DynamicMultipleTextarea";
import { FormErrors } from "../FormErrors";
import EditIcon from "../icons/EditIcon";
import SaveIcon from "../icons/SaveIcon";
import { PlaySound } from "../PlaySound";

const ExistingWordEditable = () => {
  const { currentWordId, isEdit } = useAppSelector(
    (state) => state.wordDetails
  );
  const fromResult = useFetchVocabularyQuery(undefined, {
    selectFromResult: ({ isSuccess, data }) => ({
      isSuccess,
      data: data,
    }),
  });
  const currentWord = fromResult.data?.words.filter(
    (w) => w.id === currentWordId
  )[0] as WordWithId;

  const { meanings, phrases, synonyms, antonyms } = currentWord;
  const [expanded, setExpanded] = useState<string[]>([]);
  const resolver = useYupValidationResolver(editWordSchema);
  const dispatch = useAppDispatch();
  const [updateWord] = useUpdateWordMutation();
  const {
    handleSubmit,
    register,
    reset,
    control,
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
  const errorsRef = useRef<HTMLDivElement>(null);
  const onSaveWordHandler = async (values: any) => {
    updateWord({ ...values, id: (currentWord as WordWithId).id });
    dispatch(setEditMode(false));
  };
  const editHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setEditMode(true));
  };
  const renderWordInfo = [
    {
      title: "Definitions",
      name: "meanings",
      items: currentWord?.meanings,
    },
    { title: "Examples", name: "phrases", items: currentWord?.phrases },
    { title: "Synonyms", name: "synonyms", items: currentWord?.synonyms },
    { title: "Antonyms", name: "antonyms", items: currentWord?.antonyms },
  ];
  useEffect(() => {
    reset({ meanings, phrases, synonyms, antonyms });
    // eslint-disable-next-line
  }, [isEdit]);

  useEffect(() => {
    if (!currentWord) return;
    reset({
      word: currentWord.word,
      fileUrl: currentWord.fileUrl,
      meanings: currentWord.meanings,
      partOfSpeech: currentWord.partOfSpeech.map((p) => (p as FormValue).id),
      synonyms: currentWord.synonyms,
      antonyms: currentWord.antonyms,
      phrases: currentWord.phrases,
    });
    // eslint-disable-next-line
  }, [currentWord]);
  const errorsHeight = useFormErrors(
    Object.values(errors).map((v: any) => v.message),
    errorsRef
  );
  return (
    <div className="modal-container">
      <form
        onSubmit={handleSubmit(
          (data) => onSaveWordHandler(data),
          (e) => {
            console.log(e);
          }
        )}
        className="w-full h-full"
      >
        <div className="relative w-full flex justify-start items-center gap-4">
          <span className="text-2xl font-bold">
            {currentWord.word[0].toUpperCase() + currentWord.word.slice(1)}
          </span>
          <PlaySound fileUrl={currentWord.fileUrl} />
          {isEdit ? (
            <div className="relative w-8 h-8">
              <input
                type="submit"
                className="bg-emerald-300 w-full h-full"
                value=""
              />
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
                <SaveIcon />
              </div>
            </div>
          ) : !currentWord.isFreeze ? (
            <button className="p-[2px]" onClick={editHandler}>
              <EditIcon />
            </button>
          ) : (
            <></>
          )}
          <FormErrors
            errors={Object.values(errors).map((v: any) => v.message)}
            ref={errorsRef}
            height={errorsHeight}
          />
        </div>
        {currentWord.isFreeze ? (
          <div className="text-amber-500">
            You cannot edit this word because it's included in one or more
            quizzes
          </div>
        ) : (
          <></>
        )}
        <div
          className="bordered-paragraph"
          style={{
            marginTop: `calc(8px + ${errorsHeight}px)`,
          }}
        >
          {currentWord.partOfSpeech
            .map((p) => (p as FormValue).value)
            .join(", ")}
        </div>
        <div className="word-details-container">
          {renderWordInfo.map((d) => (
            <Collapsible
              key={d.title}
              title={d.title}
              {...{ expanded, setExpanded }}
            >
              {isEdit ? (
                <DynamicMultipleTextarea
                  name={d.name}
                  control={control}
                  register={register}
                />
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
      </form>
    </div>
  );
};

export default ExistingWordEditable;
