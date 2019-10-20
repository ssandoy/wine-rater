import { useState, useCallback } from "react";

function useForm(stateSchema, validationSchema = {}, callback) {
  const [state, setState] = useState(stateSchema);
  const [isFormSubmitted, setIsFormSubmit] = useState(false);

  const validateState = useCallback(() => {
    return Object.keys(validationSchema).some(key => {
      let stateError = false;
      stateError = stateError || checkError(key, state[key].value)[0];
      return stateError;
    });
  }, [state, validationSchema]);

  const handleOnChange = useCallback(
    event => {
      setIsFormSubmit(false);

      const name = event.target.name;
      const value = event.target.value;

      const error = checkError(name, value);
      setState(prevState => ({
        ...prevState,
        [name]: { value, error },
      }));
    },
    [validationSchema]
  );

  const checkError = (key, value) => {
    let error;
    const field = validationSchema[key];
    if (field.required && !value) {
      error = "Dette feltet må fylles inn.";
    }

    if (field.validator && value && !field.validator.regEx.test(value)) {
      error = field.validator.error;
    }
    setState(prevState => ({
      ...prevState,
      [key]: { value, error },
    }));

    return [!!error, error];
  };

  const handleOnSubmit = useCallback(
    event => {
      setIsFormSubmit(true);
      event.preventDefault();
      debugger;
      if (!validateState()) {
        callback(state);
      }
    },
    [state]
  );

  return { state, isFormSubmitted, handleOnChange, handleOnSubmit };
}

export default useForm;
