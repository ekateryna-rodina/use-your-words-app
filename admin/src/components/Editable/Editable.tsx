import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  useFetchVocabularyQuery,
  useUpdateWordMutation,
} from "../../features/app-api-slice";
import { setEditMode } from "../../features/wordDetails/worddetails-slice";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { editWordSchema } from "../../schema/editWordSchema";
import { FormValue, WordWithId } from "../../types";
import { Collapsible } from "../Collapsible";
import { DynamicMultipleTextarea } from "../DynamicMultipleTextarea";

import { ModalButtonPanel } from "../ModalButtonPanel";

const Editable = () => {
  const { isEdit, currentWordId } = useAppSelector(
    (state) => state.wordDetails
  );
  const fromResult = useFetchVocabularyQuery(undefined, {
    selectFromResult: ({ isSuccess, data }) => ({
      isSuccess,
      data: data,
      // data: data?.words,
    }),
  });

  const currentWord = fromResult.data?.words.filter(
    (w) => w.id === currentWordId
  )[0] as WordWithId;

  const { meanings, phrases, synonyms, antonyms } = currentWord;
  const [expanded, setExpanded] = useState<string[]>([]);
  const resolver = useYupValidationResolver(editWordSchema);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
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
    }, [meanings]),
  });

  const onSaveWordHandler = async (values: any) => {
    updateWord({ ...values, id: currentWord.id });
    dispatch(setEditMode(false));
  };
  const data = [
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
    console.log("from result", fromResult);
    reset({ meanings, phrases, synonyms, antonyms });
    // eslint-disable-next-line
  }, [isEdit]);
  return (
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
        {/* <div className="bordered-paragraph mt-4">
          {partOfSpeech.map((p) => (p as FormValue).value).join(", ")}
        </div> */}
        <div className="overflow-y-auto max-h-[600px] pr-4">
          {data.map((d) => (
            <Collapsible
              key={d.title}
              title={d.title}
              {...{ expanded, setExpanded }}
            >
              {currentWord && isEdit ? (
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
        <ModalButtonPanel />
      </form>
    </div>
  );
};

export default Editable;
