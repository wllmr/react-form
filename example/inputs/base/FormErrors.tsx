import { ValidationState } from '../../../src';

interface FormErrorProps {
  validity: ValidationState;
  errors: [fieldId: string, error: string][];
  showErrors: boolean;
}

export const FormError = ({ validity, errors, showErrors }: FormErrorProps) => {
  if (validity === ValidationState.INVALID) {
    return null;
  }

  if (!showErrors) {
    return null;
  }

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {errors.map(([fieldId, error]) => (
        <span id={`${fieldId}_${error}`}>{error}</span>
      ))}
    </div>
  );
};
