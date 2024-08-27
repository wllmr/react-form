import { useFormContext } from '../src/hooks/useFormContext';

export const FormErrors = () => {
  const formContext = useFormContext();

  if (typeof formContext === 'undefined') {
    return null;
  }

  if (!formContext.hasBeenSubmitted) {
    return null;
  }

  // const errors: [error: string[], id: string][] = formContext.inputs
  //   .filter((input) => input.isInvalid)
  //   .map((input) => [input.errors as string[], input.id]);

  // if (errors.length === 0) {
  //   return null;
  // }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* {errors.flatMap(([inputErrors, id]) =>
        inputErrors.map((inputError) => (
          <a
            key={`${id}_${inputError}`}
            role="alert"
            aria-live="polite"
            onClick={() =>
              document
                .getElementById(id)
                ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
            }
            style={{ color: 'red' }}
          >
            {inputError}
          </a>
        ))
      )} */}
    </div>
  );
};
