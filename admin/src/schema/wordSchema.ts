import * as Yup from "yup";

export const wordSchema = Yup.object({
  id: Yup.string().nullable(),
  word: Yup.string().required().min(3, "Must be 3 characters or more"),
  meaning: Yup.array().of(Yup.object()).min(1, "Must be at least 1 meaning"),
  pronunciationRadio: Yup.string()
    .oneOf(["autofill", "upload", "record"])
    .required(),
  fileUrl: Yup.string().when("pronunciationRadio", (val, schema) => {
    if (val === "autofill") return Yup.string().required();
    else return Yup.string().notRequired();
  }),
  uploadPronunciation: Yup.string().when(
    "pronunciationRadio",
    (val, schema) => {
      if (val === "upload") return Yup.string().required();
      else return Yup.string().notRequired();
    }
  ),
  recordPronunciation: Yup.string().when(
    "pronunciationRadio",
    (val, schema) => {
      if (val === "record") return Yup.string().required();
      else return Yup.string().notRequired();
    }
  ),
  partOfSpeech: Yup.array(),
  phrase: Yup.array().of(Yup.object()).min(1, "Must be at least 1 phrase"),
  synonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 synonym"),
  antonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 antonym"),
});

export type Word = Yup.InferType<typeof wordSchema>;
