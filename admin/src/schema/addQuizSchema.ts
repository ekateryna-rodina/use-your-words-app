import * as Yup from "yup";

export const addQuizSchema = Yup.object({
  name: Yup.string().required().min(3, "Name must be 3 characters or more"),
  challenges: Yup.array(),
  tags: Yup.array(),
});

export type Quiz = Yup.InferType<typeof addQuizSchema>;
