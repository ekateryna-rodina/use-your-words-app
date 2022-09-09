import * as Yup from "yup";

export const validateAddTags = Yup.object({
  tags: Yup.array().min(1, "Must be at least 1 tag").required(),
});

export default { validateAddTags };
