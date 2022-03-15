import { useCallback } from "react";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";
export const useYupValidationResolver = (
  validationSchema: OptionalObjectSchema<ObjectShape>
) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: (errors as any).inner.reduce(
            (
              allErrors: [],
              currentError: { path: string; message: string; type: any }
            ) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );
