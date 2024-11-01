import { Fragment } from 'react';
import { useFormContext } from '../../../src/hooks/useFormContext';

export const FormError = () => {
  const context = useFormContext();

  if (!context?.hasBeenSubmitted) {
    return null;
  }

  if (
    Object.values(context.formErrors).flatMap((errors) => errors).length === 0
  ) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 bg-red-200 p-4 border-red-600 border-2">
      <h3>Form errors</h3>
      {Object.entries(context.formErrors).map(([inputId, errors]) => (
        <Fragment key={`form_errors_${inputId}`}>
          {errors.map((error) => (
            <a
              key={createFormErrorId(inputId, error)}
              role="alert"
              aria-live="polite"
              className="text-sm font-bold text-red-600 cursor-pointer hover:underline"
              onClick={() =>
                document
                  .getElementById(inputId)
                  ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
              }
            >
              {error}
            </a>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export function createFormErrorId(fieldId: string, error: string) {
  return `${fieldId}_form_error_${error.replace(/ /g, '_')}`;
}
