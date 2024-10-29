import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
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

type ValidResponse = [validity: ValidationState.VALID, errors: string[]];
type InvalidResponse = [
  validity: ValidationState.INVALID,
  errors: string[],
  forceErrors: boolean,
];
type PendingResponse = [validity: ValidationState.PENDING, errors: string[]];

type ValidityResponse = ValidResponse | InvalidResponse | PendingResponse;

type UseValidationResponse = [
  validity: ValidationState,
  errors: string[],
  showErrors: boolean,
];

export function useValidation(
  label: ReactNode,
  value: unknown,
  validators: Validator[] = [],
  id: string,
  scrollToId: string
): UseValidationResponse {
  const formContext = useFormContext();
  const validationHash = useRef('');

  // State to be used in the response
  const [validityResponse, setValidityResponse] = useState<ValidityResponse>([
    ValidationState.PENDING,
    [],
  ]);
  const [validity, errors] = validityResponse;
  const [errorsForcedByValidator, setErrorsForcedByValidator] = useState(false);

  const response = useMemo<UseValidationResponse>(() => {
    return [
      validity,
      errors,
      formContext?.hasBeenSubmitted === true ||
        errorsForcedByValidator === true,
    ];
  }, [
    validity,
    errors,
    formContext?.hasBeenSubmitted,
    errorsForcedByValidator,
  ]);

  /**
   * Runs the validators if value or comparators are changed
   */
  useEffect(() => {
    validationHash.current = Date.now().toString();
    // Prevents async validators from updating the state if a new validation is started
    const hash = `${validationHash.current}`;

    validate(value, validators, (validityResponse: ValidityResponse) => {
      if (hash !== validationHash.current) {
        return;
      }

      // If pending is returned then we keep potential errors while showing the pending state.
      // This is to reduce the flickering on the page.
      setValidityResponse((current) => {
        console.log(current);
        if (validityResponse[0] === ValidationState.PENDING) {
          return [ValidationState.PENDING, errors];
        }
        return validityResponse;
      });

      if (validityResponse[0] !== ValidationState.PENDING) {
        formContext?.setFormErrors(scrollToId, validityResponse[1]);
      }

      // If the value is unreasonable then the validator can chose to active validation
      if (response[0] === ValidationState.INVALID && response[2] === true) {
        setErrorsForcedByValidator(true);
      }
    });

    /**
     * We do not want validators in here. This is to prevent new instances with the same logic
     * from running the validation to often
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, getComparators(validators)]);

  // This will not trigger if string ends up the same
  const serializedResponse = JSON.stringify(validityResponse);

  useEffect(() => {
    const [deepCheckedValidity, deepCheckedErrors] = JSON.parse(
      serializedResponse
    ) as ValidityResponse;

    const input = new Input(
      id,
      label,
      value,
      deepCheckedValidity,
      () => {},
      deepCheckedErrors,
      scrollToId
    );
    const removeInput = formContext?.setInput(input);

    return () => {
      removeInput?.();
    };
  }, [formContext, id, value, scrollToId, serializedResponse, label]);

  return response;
}

async function validate(
  value: unknown,
  validators: Validator[],
  callback: (validityResponse: ValidityResponse) => void
) {
  const validationData = runValidators(value, validators);

  if (isValidatorsSynchronous(validationData)) {
    evaluateValidation(validationData, callback);
    return;
  }

  // Wait 300ms to set PENDING state to reduce flickering
  // TODO: Maybe set min time the PENDING state is shown?
  const pendingTimeout = setTimeout(
    () => callback([ValidationState.PENDING, []]),
    300
  );

  const status = await promiseState(Promise.all(validationData));

  switch (status) {
    // In this case we know all promises are resolved so we can evaluate the validation
    case 'resolved': {
      // Clear the timeout if the validation has already been resolved to prevent PENDING from showing
      clearTimeout(pendingTimeout);

      const data = await Promise.all(validationData);

      evaluateValidation(data, callback);
      break;
    }

    // Since not all promises are resolved we need to await the promises and then evaluate the validation
    case 'pending': {
      // Since we don't want to show PENDING state if the validation is resolved within 300ms we await the promises first
      try {
        const data = await Promise.all(validationData);
        clearTimeout(pendingTimeout);
        evaluateValidation(data, callback);
      } catch (error) {
        // We got a rejection. It could be because of bad network or similar if its async validation
        console.error(error);
      }

      break;
    }

    // Skip evaluation since promise is rejected. Could be because of bad network or similar if its a async validation
    case 'rejected': {
      // Clear the timeout if the validation has already been resolved to prevent pending from showing
      clearTimeout(pendingTimeout);

      console.error(
        "Validation promise is rejected - We shouldn't end up here"
      );

      break;
    }
  }
}

/**
 * Evaluates the validation data can calls the callback with the result
 */
function evaluateValidation(
  validationData: ValidationData[],
  callback: (validityResponse: ValidResponse | InvalidResponse) => void
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

  const forceErrors = validationData.some(
    (data) =>
      data.state === ValidationState.INVALID && data.forceErrors === true
  );

  callback([ValidationState.INVALID, errors, forceErrors]);
}

function runValidators(
  value: unknown,
  validators: Validator[]
): ValidationResponse[] {
  return validators.map((validator) => validator.validate(value));
}

function isValidatorsSynchronous(
  data: ValidationResponse[]
): data is ValidationData[] {
  return data.every(
    (data) =>
      typeof data === 'object' &&
      data !== null &&
      typeof (data as AsyncValidationData).then === 'undefined'
  );
}

function isValid(data: ValidationData[]) {
  return data.every((data) => data.state === ValidationState.VALID);
}

/**
 * List of unique strings for each validator used in the form
 * Used to check if any validator has been update
 */
function getComparators(validators: Validator[]) {
  return validators.map((validator) => validator.getComparator()).join('|');
}

function promiseState<T>(
  p: Promise<T>
): Promise<'pending' | 'resolved' | 'rejected'> {
  const t = {};

  // Evaluate if the promise is pending
  return Promise.race([t, p]).then(
    (v) => (v === t ? 'pending' : 'resolved'),
    () => 'rejected'
  );
}
