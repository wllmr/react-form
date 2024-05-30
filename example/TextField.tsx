import { useId, useRef } from 'react';
import { ValidationProps, ValidationState, useValidation } from '../src/index';

interface TextFieldProps extends ValidationProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const TextField = ({ value, onChange, validators }: TextFieldProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const id = `TextField_${useId}`;
  const [validity, errors, forceErrors] = useValidation(
    value,
    validators,
    id,
    ref
  );

  return (
    <>
      <input
        ref={ref}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        style={{
          background:
            forceErrors && validity === ValidationState.PENDING
              ? `rgba(0,0,2555,0.1)`
              : forceErrors && validity === ValidationState.INVALID
                ? `rgba(255,0,0,0.1)`
                : `rgba(0,255,0,0.1)`,
        }}
      />
      <span>
        {validity} - {forceErrors ? 'show errors' : "don't show errors"}
      </span>
      {errors.length > 0 && <span>{errors}</span>}
    </>
  );
};
