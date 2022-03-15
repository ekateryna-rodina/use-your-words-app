import * as Yup from "yup";

export const wordSchema = Yup.object({
  id: Yup.string().nullable(),
  word: Yup.string().required().min(3, "Must be 3 characters or more"),
  meaning: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().optional(),
        value: Yup.string()
          .required()
          .min(5, "Meaning must be 5 characters at least"),
      })
    )
    .test({
      message: "Enter 1 meaning at least",
      test: (arr) => !arr || arr.length < 1,
    }),
  fileUrl: Yup.string().required().min(5, "Must be 5 characters or more"),
  partOfSpeech: Yup.array().of(
    Yup.mixed().oneOf(["verb", "noun", "adjective"])
  ),
  phrases: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().optional(),
        value: Yup.string()
          .required()
          .min(5, "Phrase must be 5 characters at least"),
      })
    )
    .test({
      message: "Enter 1 phrase at least",
      test: (arr) => !arr || arr.length < 1,
    }),
  synonyms: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().optional(),
        value: Yup.string()
          .required()
          .min(3, "Synonym must be 3 characters at least"),
      })
    )
    .test({
      message: "Enter 1 synonym at least",
      test: (arr) => !arr || arr.length < 1,
    }),
  antonyms: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().optional(),
        value: Yup.string()
          .required()
          .min(3, "Antonym must be 3 characters at least"),
      })
    )
    .min(1, "Enter 1 antonym at least"),
});

export type Word = Yup.InferType<typeof wordSchema>;
