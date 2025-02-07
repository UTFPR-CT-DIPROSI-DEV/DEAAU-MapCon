import { useEffect } from 'react';
import { useFormContext } from './FormProvider';

function SubForm({ onSubmit, children }) {
  const { registerForm } = useFormContext();

  // Register this subform's submit action with the global context
  useEffect(() => {
    registerForm(onSubmit);
  }, [registerForm]);

  return (
    <form onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default SubForm;
