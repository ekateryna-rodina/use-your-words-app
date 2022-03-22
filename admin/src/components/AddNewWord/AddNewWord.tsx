import React, { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { wordSchema } from "../../schema/wordSchema";
import { FormValue, Word } from "../../types/Word";
import request from "../../utils/request";
import { DynamicMultipleTextarea } from "../DynamicMultipleTextarea";
import { FileUploader } from "../FileUploader";
import { SelectField } from "../SelectField";
import { TextField } from "../TextField";

type AddNewWordProps = {
  word?: Word;
};
function AddNewWord({ word }: AddNewWordProps) {
  const [editWord] = useState<Word | undefined>(word);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error] = useState<boolean>(false);
  const [autofill, setAutofill] = useState<Partial<Word> | null>(null);
  const resolver = useYupValidationResolver(wordSchema);
  const [editedFields, setEditedFields] = useState({});
  const {
    handleSubmit,
    register,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Word>({ resolver });

  const [postPutUrl, wordInfoUrl] = [
    "http://localhost:8080/api/words",
    "http://localhost:8080/api/wordsApi",
  ];

  const onSaveWordHandler = async (values: any) => {
    setLoading(true);
    if (editWord) {
      console.log("values end", getValues());
      console.log("editWord", editWord);
      request(postPutUrl, values, "PUT")
        .then((info) => console.log(info))
        .catch((err) => console.log(err));
    } else {
      request(postPutUrl, values, "POST")
        .then((info) => console.log(info))
        .catch((err) => console.log(err));
    }

    setLoading(false);
  };
  const onAutoFillHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const values: Partial<Word> = getValues();
    if (!values.word) return;
    setLoading(true);

    request(wordInfoUrl, { word: values.word })
      .then((response) => {
        setAutofill(response.wordInfo);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!autofill || !Object.keys(autofill).length) return;
    const { fileUrl, meanings, partOfSpeech, phrases, synonyms, antonyms } =
      autofill;

    reset({
      fileUrl,
      meanings,
      partOfSpeech,
      synonyms,
      antonyms,
      phrases,
    });

    // eslint-disable-next-line
  }, [autofill]);
  useEffect(() => {
    if (!editWord) return;
    reset({
      word: editWord.word,
      fileUrl: editWord.fileUrl,
      meanings: editWord.meanings,
      partOfSpeech: editWord.partOfSpeech.map((p) => (p as FormValue).value),
      synonyms: editWord.synonyms,
      antonyms: editWord.antonyms,
      phrases: editWord.phrases,
    });
    // eslint-disable-next-line
  }, [editWord]);
  return (
    <div>
      {editWord ? "Edit word" : "Create New Word"}
      <form
        onSubmit={handleSubmit(
          (data) => onSaveWordHandler(data),
          (e) => {
            console.log(e);
          }
        )}
      >
        <TextField label="Enter word" name="word" validate={register} />
        <button onClick={(e) => onAutoFillHandler(e)}>Autofill</button>
        <div>
          <TextField label="Enter mp3 url" name="fileUrl" validate={register} />
          or
          <FileUploader file={file} setFile={setFile} error={error} />
        </div>
        <SelectField
          label="Select part of speech"
          name="partOfSpeech"
          options={["verb", "noun", "adjective"]}
          validate={register}
        />

        <DynamicMultipleTextarea
          name="meaning"
          formValuesInit={(getValues() as Partial<Word>).meanings}
          control={control}
          register={register}
        />
        <DynamicMultipleTextarea
          name="phrase"
          formValuesInit={(getValues() as Partial<Word>).phrases}
          control={control}
          register={register}
        />
        <DynamicMultipleTextarea
          name="synonym"
          control={control}
          formValuesInit={(getValues() as Partial<Word>).synonyms}
          register={register}
        />
        <DynamicMultipleTextarea
          name="antonym"
          control={control}
          formValuesInit={(getValues() as Partial<Word>).antonyms}
          register={register}
        />
        {loading ? <span>Loading</span> : <></>}
        <button type="submit">Save</button>
        {Object.keys(errors).length ? (
          <ul>
            {Object.keys(errors).length ? (
              Object.keys(errors).map((e, index) => (
                <li key={index}>
                  {(errors[e as keyof typeof errors] as FieldError).message}
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}

export default AddNewWord;
