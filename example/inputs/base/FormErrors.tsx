import { ValidationState } from '../../../src';

interface FormErrorProps {
  validity: ValidationState;
  errors: [fieldId: string, error: string][];
  showErrors: boolean;
}

export const FormError = ({ validity, errors, showErrors }: FormErrorProps) => {
  if (validity !== ValidationState.INVALID) {
    return null;
  }

  if (!showErrors) {
    return null;
  }

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      {errors.map(([fieldId, error]) => (
        <span
          id={createFormErrorId(fieldId, error)}
          className="text-sm font-bold text-red-600"
        >
          {error}
        </span>
      ))}
    </div>
  );
};

export function createFormErrorId(fieldId: string, error: string) {
  return `${fieldId}_form_error_${error.replace(/ /g, '_')}`;
}
