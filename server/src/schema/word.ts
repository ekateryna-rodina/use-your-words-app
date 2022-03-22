import * as Yup from "yup";

export const validateWord = Yup.object({
  id: Yup.string().nullable(),
  word: Yup.string().required().min(3, "Must be 3 characters or more"),
  meaning: Yup.array().of(Yup.object()).min(1, "Must be at least 1 meaning"),
  fileUrl: Yup.string().required().min(5, "Must be 5 characters or more"),
  partOfSpeech: Yup.array(),
  phrase: Yup.array().of(Yup.object()).min(1, "Must be at least 1 phrase"),
  synonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 synonym"),
  antonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 antonym"),
});

export default validateWord;
