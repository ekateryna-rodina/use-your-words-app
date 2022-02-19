import * as Yup from "yup";
const validateWord = Yup.object({
  word: Yup.string().required().min(3, "Must be 3 characters or more"),
  meaning: Yup.string().required().min(5, "Must be 5 characters or more"),
  fileUrl: Yup.string().required().min(5, "Must be 5 characters or more"),
  partOfSpeech: Yup.array().of(
    Yup.mixed().oneOf(["verb", "noun", "adjective"])
  ),
  phrases: Yup.string().required().min(10, "Must be 10 characters or more"),
  synonyms: Yup.string().required().min(3, "Must be 3 characters or more"),
  antonyms: Yup.string().required().min(3, "Must be 3 characters or more"),
});

export default validateWord;
