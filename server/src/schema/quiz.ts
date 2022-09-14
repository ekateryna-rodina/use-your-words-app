import * as Yup from "yup";

export const validateAddQuiz = Yup.object({
  name: Yup.string().required().min(3, "Name must be 3 characters or more"),
  challenges: Yup.array().min(1, "At least 1 tag is required").required(),
  tags: Yup.array().min(1, "At least 1 tag is required").required(),
});

export default { validateAddQuiz };
