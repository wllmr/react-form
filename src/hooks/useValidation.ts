import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs';
import { Input } from '../contexts/FormContext';
import {
  AsyncValidationData,
  InvalidValidationData,
  ValidationData,
  ValidationResponse,
  ValidationState,
  Validator,
} from '../validators/Validator';
import { useFormContext } from './useFormContext';

type UseValidationResponse = [
  validity: ValidationState,
  errors: string[],
  showErrors: boolean,
];

export function useValidation(
  label: React.ReactNode,
  value: unknown,
  validators: Validator[] = [],
  id: string,
  scrollToId: string
): UseValidationResponse {
  const formContext = useFormContext();

  // 🔥 Immediate state update for smooth typing
  const [validityResponse, setValidityResponse] = useState<
    [ValidationState, string[]]
  >([ValidationState.PENDING, []]);

  const [validity, errors] = validityResponse;

  const validationSubject = useRef(new BehaviorSubject(value));

  // Store the input instance
  const inputRef = useRef<Input>(
    new Input(
      id,
      label,
      value,
      ValidationState.PENDING,
      () => {},
      [],
      scrollToId
    )
  );

  // 🎯 Memoized response to prevent unnecessary re-renders
  const response = useMemo<UseValidationResponse>(() => {
    return [validity, errors, formContext?.hasBeenSubmitted === true];
  }, [validity, errors, formContext?.hasBeenSubmitted]);

  // 🔥 Listen for value changes & validate (debounced with cancellation)
  useEffect(() => {
    const subscription = validationSubject.current
      .pipe(
        // Cancel previous validations when a new value is entered
        switchMap((newValue) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              setValidityResponse([ValidationState.PENDING, []]); // Set PENDING state after 300ms
              resolve(newValue);
            }, 300);
          });
        }),
        debounceTime(300), // Delay validation by another 300ms to prevent flickering
        distinctUntilChanged(), // Prevents duplicate validations
        tap(() => setValidityResponse([ValidationState.PENDING, []])) // Ensure PENDING state before validation
      )
      .subscribe((newValue) => {
        validate(newValue, validators, (newValidityResponse) => {
          setValidityResponse((current) => {
            if (
              current[0] === newValidityResponse[0] &&
              JSON.stringify(current[1]) ===
                JSON.stringify(newValidityResponse[1])
            ) {
              return current;
            }
            return newValidityResponse;
          });

          // Update inputRef only if necessary
          const input = inputRef.current;
          if (
            input.value !== newValue ||
            JSON.stringify(input.errors) !==
              JSON.stringify(newValidityResponse[1])
          ) {
            input.value = newValue;
            input.validationState = newValidityResponse[0];
            input.errors = newValidityResponse[1];

            formContext?.setInput(input);
          }
        });
      });

    return () => subscription.unsubscribe(); // Cleanup
  }, [validators, formContext]);

  // 🔥 Update value immediately without blocking typing
  useEffect(() => {
    validationSubject.current.next(value);
  }, [value]);

  return response;
}

/**
 * Runs the validators and returns validation results
 */
async function validate(
  value: unknown,
  validators: Validator[],
  callback: (validityResponse: [ValidationState, string[]]) => void
) {
  const validationData = runValidators(value, validators);

  if (isValidatorsSynchronous(validationData)) {
    evaluateValidation(validationData, callback);
    return;
  }

  try {
    const data = await Promise.all(validationData);
    evaluateValidation(data, callback);
  } catch (error) {
    console.error('Validation error:', error);
  }
}

/**
 * Evaluates the validation data and calls the callback with the result
 */
function evaluateValidation(
  validationData: ValidationData[],
  callback: (validityResponse: [ValidationState, string[]]) => void
) {
  if (isValid(validationData)) {
    callback([ValidationState.VALID, []]);
    return;
  }

  const errors = validationData
    .filter(
      (data): data is InvalidValidationData =>
        data.state === ValidationState.INVALID
    )
    .map((data) => data.error);

  callback([ValidationState.INVALID, errors]);
}

/**
 * Runs validators and returns validation results
 */
function runValidators(
  value: unknown,
  validators: Validator[]
): ValidationResponse[] {
  return validators.map((validator) => validator.validate(value));
}

/**
 * Determines if all validators are synchronous
 */
function isValidatorsSynchronous(
  data: ValidationResponse[]
): data is ValidationData[] {
  return data.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as AsyncValidationData).then === 'undefined'
  );
}

/**
 * Determines if all validators return valid results
 */
function isValid(data: ValidationData[]) {
  return data.every((data) => data.state === ValidationState.VALID);
}
