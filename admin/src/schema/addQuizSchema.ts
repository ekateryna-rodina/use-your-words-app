import * as Yup from "yup";

export const addQuizSchema = Yup.object({
  name: Yup.string().required().min(3, "Must be 3 characters or more"),
});

export type Quiz = Yup.InferType<typeof addQuizSchema>;
