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
      {errors.map((error) => (
        <span
          key={createInputErrorId(fieldId, error)}
          id={createInputErrorId(fieldId, error)}
          className="text-sm font-bold text-red-600"
        >
          {error}
        </span>
      ))}
    </div>
  );
};

export function createInputErrorId(fieldId: string, error: string) {
  return `${fieldId}_input_error_${error.replace(/ /g, '_')}`;
}
