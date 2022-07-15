import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { editWordSchema } from "../../schema/editWordSchema";
import { FormValue, WordWithId } from "../../types";
import request from "../../utils/request";
import { Collapsible } from "../Collapsible";
import { DynamicMultipleTextarea } from "../DynamicMultipleTextarea";

import { ModalButtonPanel } from "../ModalButtonPanel";

const Editable = () => {
  const { isEdit, currentWord } = useAppSelector((state) => state.wordDetails);
  const { id, word, partOfSpeech, meanings, phrases, synonyms, antonyms } =
    currentWord as WordWithId;
  const [expanded, setExpanded] = useState<string[]>([]);
  const resolver = useYupValidationResolver(editWordSchema);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const {
    handleSubmit,
    register,
    control,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver,
    defaultValues: {
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
    },
  });

  const [postPutUrl, wordInfoUrl] = [
    "http://localhost:8080/api/words",
    "http://localhost:8080/api/wordsApi",
  ];

  const onSaveWordHandler = async (values: any) => {
    if (!currentWord) return;

    request(postPutUrl, { ...values, id: currentWord.id }, "PUT")
      .then((info) => console.log(info))
      .catch((err) => console.log(err));
  };
  const data = [
    { title: "Definitions", name: "meanings", items: currentWord?.meanings },
    { title: "Examples", name: "phrases", items: currentWord?.phrases },
    { title: "Synonyms", name: "synonyms", items: currentWord?.synonyms },
    { title: "Antonyms", name: "antonyms", items: currentWord?.antonyms },
  ];
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
        <div className="bordered-paragraph mt-4">
          {partOfSpeech.map((p) => (p as FormValue).value).join(", ")}
        </div>
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
