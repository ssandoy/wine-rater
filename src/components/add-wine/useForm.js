import { useState, useEffect, useCallback } from "react";

function useForm(stateSchema, validationSchema = {}, callback) {
  const [state, setState] = useState(stateSchema);
  const [isFormSubmitted, setIsFormSubmit] = useState(false);

  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(validationSchema).some(key => {
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value;
      const stateError = state[key].error;
      return (isInputFieldRequired && !stateValue) || stateError;
    });

    return hasErrorInState;
  }, [state, validationSchema]);

  const handleOnChange = useCallback(
    event => {
      validateState();
      setIsFormSubmit(false);

      const name = event.target.name;
      const value = event.target.value;

      let error = checkError(validationSchema[name], value);
      setState(prevState => ({
        ...prevState,
        [name]: { value, error }
      }));
    },
    [validationSchema]
  );

  const checkError = (field, value) => {
    let error = "";
    if (field.required) {
      if (!value) {
        error = "This is a required field";
      }
    }

    if (field.validator !== null && field.validator !== undefined) {
      if (value && !field.validator.regEx.test(value)) {
        error = field.validator.error;
      }
    }

    return error;
  };

  const handleOnSubmit = useCallback(
    event => {
      setIsFormSubmit(true);
      event.preventDefault();
      if (!validateState()) {
        callback(state);
      }
    },
    [state]
  );

  return { state, isFormSubmitted, handleOnChange, handleOnSubmit };
}

export default useForm;
