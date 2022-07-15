import * as Yup from "yup";

export const editWordSchema = Yup.object({
  id: Yup.string().nullable(),
  meaning: Yup.array().of(Yup.object()).min(1, "Must be at least 1 meaning"),
  partOfSpeech: Yup.array(),
  phrase: Yup.array().of(Yup.object()).min(1, "Must be at least 1 phrase"),
  synonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 synonym"),
  antonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 antonym"),
});

export type Word = Yup.InferType<typeof editWordSchema>;
