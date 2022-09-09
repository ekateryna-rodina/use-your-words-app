import * as Yup from "yup";

export const editWordSchema = Yup.object({
  id: Yup.string().nullable(),
  meaning: Yup.array()
    .of(Yup.object())
    .min(1, "Must be at least 1 meaning")
    .required(),
  partOfSpeech: Yup.array().required(),
  phrase: Yup.array()
    .of(Yup.object())
    .min(1, "Must be at least 1 phrase")
    .required(),
  synonym: Yup.array()
    .of(Yup.object())
    .min(1, "Must be at least 1 synonym")
    .required(),
  antonym: Yup.array()
    .of(Yup.object())
    .min(1, "Must be at least 1 antonym")
    .required(),
});

export type Word = Yup.InferType<typeof editWordSchema>;
