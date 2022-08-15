import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { useUpdateWordMutation } from "../../features/app-api-slice";
import { setEditMode } from "../../features/wordDetails/worddetails-slice";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { editWordSchema } from "../../schema/editWordSchema";
import { FormValue, PartOfSpeech, Word, WordWithId } from "../../types";
import { Collapsible } from "../Collapsible";
import { DynamicMultipleTextarea } from "../DynamicMultipleTextarea";
import ListenIcon from "../icons/ListenIcon";
import { ModalButtonPanel } from "../ModalButtonPanel";
import { SelectField } from "../SelectField";
import { TextField } from "../TextField";

const Editable = ({
  word,
  isEdit,
  isNew,
  partsOfSpeech,
}: {
  word: Word | WordWithId;
  isEdit: boolean;
  isNew: boolean;
  partsOfSpeech?: PartOfSpeech[];
}) => {
  const { meanings, phrases, synonyms, antonyms } = word;
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
    }, [meanings, phrases, synonyms, antonyms]),
  });

  const onSaveWordHandler = async (values: any) => {
    updateWord({ ...values, id: (word as WordWithId).id });
    dispatch(setEditMode(false));
  };
  const data = [
    {
      title: "Definitions",
      name: "meanings",
      items: word?.meanings,
    },
    { title: "Examples", name: "phrases", items: word?.phrases },
    { title: "Synonyms", name: "synonyms", items: word?.synonyms },
    { title: "Antonyms", name: "antonyms", items: word?.antonyms },
  ];
  useEffect(() => {
    reset({ meanings, phrases, synonyms, antonyms });
    // eslint-disable-next-line
  }, [isEdit]);
  return (
    <div className="relative">
      <div className="h-12">
        <div className="absolute top-0 left-0 flex justify-start items-center gap-4 my-0 ">
          {!isNew ? (
            <span className="text-2xl font-bold">
              {word.word[0].toUpperCase() + word.word.slice(1)}
            </span>
          ) : (
            <TextField
              label=""
              name="word"
              validate={register}
              disabled={false}
            />
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
              {word.partOfSpeech.map((p) => (p as FormValue).value).join(", ")}
            </div>
          ) : (
            <SelectField
              label="Parts of speech"
              validate={register}
              name="partOfSpeech"
              options={partsOfSpeech as PartOfSpeech[]}
              control={control}
            />
          )}
          <div className="overflow-y-auto max-h-[600px] pr-4">
            {data.map((d) => (
              <Collapsible
                key={d.title}
                title={d.title}
                {...{ expanded, setExpanded }}
              >
                {word && isEdit ? (
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
