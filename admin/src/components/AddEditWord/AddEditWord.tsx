import axios from "axios";
import React, { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { addWordSchema } from "../../schema/addWordSchema";
import { FormValue, Word } from "../../types/";
import request from "../../utils/request";
import { DynamicMultipleTextarea } from "../DynamicMultipleTextarea";

function AddEditWord() {
  const { currentWord } = useAppSelector((state) => state.wordDetails);
  const [loading, setLoading] = useState<boolean>(false);
  const [autofill, setAutofill] = useState<Partial<Word> | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<boolean>(false);
  const resolver = useYupValidationResolver(addWordSchema);

  const [postPutUrl, wordInfoUrl] = [
    "http://localhost:8080/api/words",
    "http://localhost:8080/api/wordsApi",
  ];
  const {
    handleSubmit,
    register,
    control,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Word>({
    resolver,
    defaultValues: {
      pronunciationRadio: "autofill",
    },
  });
  const submitFileToStorage = async () => {
    if (file?.name) {
      const [cloudName, uploadPreset] = [
        process.env.REACT_APP_CLOUD_NAME ?? "",
        process.env.REACT_APP_UPLOAD_PRESET ?? "",
      ];

      if (!cloudName || !uploadPreset) return;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("resource_type", "video");
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          formData
        );
        return response.data.secure_url;
      } catch (error) {
        return null;
      }
    }
  };

  const onSaveWordHandler = async (values: any) => {
    let fileUrl = getValues("fileUrl");
    setLoading(true);
    console.log(
      getValues("pronunciationRadio"),
      ["upload", "record"].includes(getValues("pronunciationRadio"))
    );
    if (["upload", "record"].includes(getValues("pronunciationRadio"))) {
      fileUrl = await submitFileToStorage();
    }

    if (currentWord) {
      request(
        postPutUrl,
        { ...values, id: currentWord.id, fileUrl: fileUrl },
        "PUT"
      )
        .then((info) => console.log(info))
        .catch((err) => console.log(err));
    } else {
      request(postPutUrl, { ...values, fileUrl }, "POST")
        .then((info) => console.log("in", fileUrl, info))
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
      pronunciationRadio: "autofill",
      partOfSpeech,
      synonyms,
      antonyms,
      phrases,
    });

    // eslint-disable-next-line
  }, [autofill]);
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
  return (
    <div>
      {currentWord ? "Edit word" : "Create New Word"}
      <form
        onSubmit={handleSubmit(
          (data) => onSaveWordHandler(data),
          (e) => {
            console.log(e);
          }
        )}
      >
        {/* <TextField
          label="Enter word"
          name="word"
          validate={register}
          disabled={false}
        /> */}
        {/* <button onClick={(e) => onAutoFillHandler(e)}>Autofill</button> */}
        {/* <PronunciationRadio
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
        /> */}
        {/* <SelectField
          label="Select part of speech"
          name="partOfSpeech"
          options={[]} // use API query
          validate={register}
          control={control}
        /> */}

        <DynamicMultipleTextarea
          name="meaning"
          formValuesInit={(getValues() as Partial<Word>).meanings}
          control={control}
          register={register}
        />
        {/* <DynamicMultipleTextarea
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
        /> */}
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
