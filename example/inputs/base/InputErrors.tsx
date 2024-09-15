import { ValidationState } from '../../../src';

interface InputErrorsProps {
  fieldId: string;
  validity: ValidationState;
  errors: string[];
  showErrors: boolean;
}

export const InputErrors = ({
  fieldId,
  validity,
  errors,
  showErrors,
}: InputErrorsProps) => {
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
      {errors.map((error) => (
        <span id={`${fieldId}_${error}`}>{error}</span>
      ))}
    </div>
  );
};
