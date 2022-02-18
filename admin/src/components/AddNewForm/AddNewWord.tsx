import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Word } from "../../types/Word";
import request from "../../utils/request";
import { FileUploader } from "../FileUploader";
import { SelectField } from "../SelectField";
import { TextArea } from "../TextArea";
import { TextField } from "../TextField";

function AddNewWord() {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<boolean>(false);
  const validate = Yup.object({
    word: Yup.string().required().min(3, "Must be 3 characters or more"),
    meaning: Yup.string().required().min(5, "Must be 5 characters or more"),
    fileUrl: Yup.string().required().min(5, "Must be 5 characters or more"),
    partOfSpeech: Yup.number().required().oneOf([1, 2, 3], "Required"),
    phrases: Yup.string().required().min(10, "Must be 10 characters or more"),
    synonyms: Yup.string().required().min(3, "Must be 3 characters or more"),
    antonyms: Yup.string().required().min(3, "Must be 3 characters or more"),
  });
  const initialValues = {
    word: "",
    meaning: "",
    fileUrl: "",
    partOfSpeech: 0,
    phrases: "",
    synonyms: "",
    antonyms: "",
  };
  const onSaveWordHandler = async (values: Word) => {
    setLoading(true);
    request(`http://localhost/words`, values, "POST")
      .then((info) => console.log(info))
      .catch((err) => console.log(err));
    setLoading(false);
  };
  const onAutoFillHandler = async (e: React.FormEvent, word: string) => {
    e.preventDefault();
    if (!word) return;
    setLoading(true);
    request(`http://localhost:8080/api/wordsApi`, { word })
      .then((info) => console.log(info))
      .catch((err) => console.log(err));
    setLoading(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={(values) => onSaveWordHandler(values)}
    >
      {(formik) => (
        <div>
          Create New Word
          <Form>
            <TextField label="Enter word" name="word" />
            <button onClick={(e) => onAutoFillHandler(e, formik.values.word)}>
              Autofill
            </button>
            <TextField label="Enter meaning" name="meaning" />
            <div>
              <TextField label="Enter mp3 url" name="fileUrl" />
              or
              <FileUploader file={file} setFile={setFile} error={error} />
            </div>
            <SelectField label="Select part of speech" name="partOfSpeech" />
            <TextArea
              name="phrases"
              label="Enter phrases (divide with '|' if multiple)"
            />
            <TextArea
              name="synonyms"
              label="Enter synonyms (divide with '|' if multiple)"
            />
            <TextArea
              name="antonyms"
              label="Enter antonyms (divide with '|' if multiple)"
            />
            {loading ? <span>Loading</span> : <></>}
            <button type="submit">Save</button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default AddNewWord;
