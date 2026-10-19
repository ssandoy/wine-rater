import type Wine from "../../models/wine";
import type { Errors, ValidationSchema } from "./validationSchema";

export const validateForm = (
  validationSchema: ValidationSchema,
  values: Wine
): Errors | null => {
  const errors: Errors = Object.fromEntries(
    (Object.keys(validationSchema) as (keyof Wine)[]).flatMap((key) => {
      const field = validationSchema[key];
      const error = field && checkError(field, values[key]);
      return error ? [[key, error]] : [];
    })
  );

  // Return null if empty.
  return Object.keys(errors).length === 0 ? null : errors;
};

const checkError = (
  field: NonNullable<ValidationSchema[keyof Wine]>,
  value: Wine[keyof Wine]
): string | undefined => {
  if (!value) {
    return field.required ? "Dette feltet må fylles inn." : undefined;
  }

  return field.validator && !field.validator.regEx.test(String(value))
    ? field.validator.error
    : undefined;
};
