import * as Yup from "yup";

export const validateQuestionsInput = Yup.object({
  wordIds: Yup.array().min(5, "Must be at least 5 words"),
});

export default { validateQuestionsInput };
