import * as Yup from "yup";

export const validateGetQuestionsInput = Yup.object({
  wordIds: Yup.array().min(5, "Must be at least 5 words"),
});

export const validateSaveQuestionsInput = Yup.object({});
export default { validateGetQuestionsInput, validateSaveQuestionsInput };
