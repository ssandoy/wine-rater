export const validateForm = (validationSchema, values) => {
  const errors = {};
  Object.keys(validationSchema).map(key => {
    const error = checkError(validationSchema, key, values[key]);
    if (error[0]) {
      errors[key] = error[1];
    }
  });
  return errors;
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
