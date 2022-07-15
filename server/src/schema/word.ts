import * as Yup from "yup";

const validateAddWord = Yup.object({
  words: Yup.array().min(5, "Must be at least 5 words"),
  word: Yup.string().required().min(3, "Must be 3 characters or more"),
  meaning: Yup.array().of(Yup.object()).min(1, "Must be at least 1 meaning"),
  fileUrl: Yup.string().required(),
  partOfSpeech: Yup.array(),
  phrase: Yup.array().of(Yup.object()).min(1, "Must be at least 1 phrase"),
  synonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 synonym"),
  antonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 antonym"),
});

const validateEditWord = Yup.object({
  meaning: Yup.array().of(Yup.object()).min(1, "Must be at least 1 meaning"),
  phrase: Yup.array().of(Yup.object()).min(1, "Must be at least 1 phrase"),
  synonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 synonym"),
  antonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 antonym"),
});

export { validateAddWord, validateEditWord };
