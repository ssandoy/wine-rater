import type Wine from "../../models/wine";
import type { Errors, ValidationSchema } from "./validationSchema";

export const validateForm = (
  validationSchema: ValidationSchema,
  values: Wine
): Errors | null => {
  const errors: Errors = {};
  for (const key of Object.keys(validationSchema) as (keyof Wine)[]) {
    const field = validationSchema[key];
    if (!field) {
      continue;
    }

    const error = checkError(field, values[key]);
    if (error) {
      errors[key] = error;
    }
  }

  // Return null if empty.
  return Object.entries(errors).length === 0 ? null : errors;
};

const checkError = (
  field: NonNullable<ValidationSchema[keyof Wine]>,
  value: Wine[keyof Wine]
): string | undefined => {
  let error: string | undefined;
  if (field.required && !value) {
    error = "Dette feltet må fylles inn.";
  }

  if (field.validator && value && !field.validator.regEx.test(String(value))) {
    error = field.validator.error;
  }

  return error;
};
