import * as Yup from "yup";

export const validateWords = Yup.object({
  wordIds: Yup.array().min(5, "Must be at least 5 words"),
});

export default validateWords;
