import { Fragment } from 'react';
import { useFormContext } from '../../../src/hooks/useFormContext';

export const FormError = () => {
  const context = useFormContext();

  if (!context?.hasBeenSubmitted) {
    return null;
  }

  if (context.form.inputs.flatMap((i) => i.errors).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 bg-red-200 p-4 border-red-600 border-2">
      <h3>Form errors</h3>
      {context.form.inputs.map((input) => (
        <Fragment key={`form_errors_${input.id}`}>
          {input.errors?.map((error) => (
            <a
              key={createFormErrorId(input.id, error)}
              role="alert"
              aria-live="polite"
              className="text-sm font-bold text-red-600"
              onClick={() =>
                document
                  .getElementById(input.id)
                  ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
              }
            >
              {typeof input.label !== 'undefined' || input.label === null
                ? `${input.label} - `
                : ''}
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
