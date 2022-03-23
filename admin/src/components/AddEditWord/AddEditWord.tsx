import React, { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { wordSchema } from "../../schema/wordSchema";
import {
  FormValue,
  PartOfSpeech,
  PronunciationType,
  Word,
  WordWithId,
} from "../../types/";
import request from "../../utils/request";
import { DynamicMultipleTextarea } from "../DynamicMultipleTextarea";
import { PronunciationRadio } from "../PronunciationRadio";
import { SelectField } from "../SelectField";
import { TextField } from "../TextField";

type AddEditWordProps = {
  word?: WordWithId;
  tempParts: PartOfSpeech[];
};
function AddEditWord({ word, tempParts }: AddEditWordProps) {
  const [editWord] = useState<WordWithId | undefined>(word);
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<PronunciationType>("autofill");
  const [autofill, setAutofill] = useState<Partial<Word> | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<boolean>(false);
  const resolver = useYupValidationResolver(wordSchema);
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
      request(postPutUrl, { ...values, id: editWord.id }, "PUT")
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
      partOfSpeech: editWord.partOfSpeech.map((p) => (p as FormValue).id),
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
        <TextField
          label="Enter word"
          name="word"
          validate={register}
          disabled={false}
        />
        <button onClick={(e) => onAutoFillHandler(e)}>Autofill</button>
        <PronunciationRadio
          {...{
            register,
            file,
            setFile,
            fileError,
            setFileError,
            active,
            setActive,
          }}
        />
        <SelectField
          label="Select part of speech"
          name="partOfSpeech"
          options={tempParts}
          validate={register}
          control={control}
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

export default React.memo(AddEditWord);
