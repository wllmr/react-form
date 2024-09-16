import { cx } from 'class-variance-authority';
import {
  forwardRef,
  InputHTMLAttributes,
  useId,
  useImperativeHandle,
  useRef,
} from 'react';
import { useValidation, ValidationState } from '../../src';
import { InputBaseProps } from './base/input.type';
import { createInputErrorId, InputErrors } from './base/InputErrors';
import { Label } from './base/Label';

export interface TextFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    InputBaseProps {}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, className, type, value, validators, ...props }, forwardRef) => {
    const customId = useId();
    const id = props.id ?? customId;
    const ref = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(forwardRef, () => ref.current!, []);

    const [validity, errors, showErrors] = useValidation(
      label,
      value,
      validators,
      id,
      ref
    );

    return (
      <div className={cx('flex flex-col gap-1', className)}>
        <Label className="bg-red" htmlFor={id}>
          {label}
        </Label>
        <input
          {...props}
          id={id}
          type={type}
          className={cx(
            'flex h-10 w-full rounded-sm border-2 border-input outline-none bg-background px-3 py-2 text-sm placeholder:text-muted-foreground',
            {
              'border-red-600':
                validity === ValidationState.INVALID && showErrors,
              'border-blue-600':
                validity === ValidationState.PENDING && showErrors,
            }
          )}
          aria-describedby={
            showErrors && validity === ValidationState.INVALID
              ? errors.map((error) => createInputErrorId(id, error)).join(' ')
              : undefined
          }
          ref={ref}
        />
        <InputErrors
          fieldId={id}
          validity={validity}
          errors={errors}
          showErrors={showErrors}
        />
      </div>
    );
  }
);
TextField.displayName = 'TextField';
