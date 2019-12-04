import { iErrors } from "./validationSchema";

export const validateForm = (validationSchema, values): iErrors | null => {
  const errors = {} as iErrors;
  Object.keys(validationSchema).map(key => {
    const error = checkError(validationSchema, key, values[key]);
    if (error[0]) {
      errors[key] = error[1];
    }
  });
  // Return null if empty.
  return Object.entries(errors).length === 0 ? null : errors;
};

export const checkError = (validationSchema, key, value) => {
  let error;
  const field = validationSchema[key];
  if (field.required && !value) {
    error = "Dette feltet må fylles inn.";
  }

  if (field.validator && value && !field.validator.regEx.test(value)) {
    error = field.validator.error;
  }

  return [!!error, error];
};
