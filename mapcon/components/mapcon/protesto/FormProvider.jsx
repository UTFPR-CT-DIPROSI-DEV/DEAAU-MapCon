import { createContext, useContext, useCallback, useRef } from 'react';

// Create the FormContext
const FormContext = createContext(null);

export function useFormContext() {
  return useContext(FormContext);
}

export function FormProvider({ children }) {
  const formRefs = useRef([]);

  // Register each form's submit function
  const registerForm = useCallback((submitForm) => {
    formRefs.current.push(submitForm);
  }, []);

  // Global submit that calls each form's submit function
  const submitForms = useCallback(() => {
    formRefs.current.forEach((submitForm) => submitForm());
  }, []);

  return (
    <FormContext.Provider value={{ registerForm, submitForms }}>
      {children}
    </FormContext.Provider>
  );
}
