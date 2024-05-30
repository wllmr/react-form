import { RefObject, useEffect, useMemo, useState } from 'react';
import { Input } from '../contexts/FormContext';
import {
  AsyncValidationData,
  InvalidValidationData,
  ValidationData,
  ValidationResponses,
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

type useValidationResponse = [
  validity: ValidationState,
  errors: string[],
  showErrors: boolean,
];

export function useValidation(
  value: unknown,
  validators: Validator[] = [],
  id: string,
  scrollToRef: RefObject<HTMLElement>
): useValidationResponse {
  const formContext = useFormContext();
  const [validityResponse, setValidityResponse] = useState<ValidityResponse>([
    ValidationState.PENDING,
    [],
  ]);
  const [errorsForcedByValidator, setErrorsForcedByValidator] = useState(false);

  const response = useMemo<useValidationResponse>(() => {
    return [
      validityResponse[0],
      validityResponse[1],
      formContext?.hasBeenSubmitted === true ||
        errorsForcedByValidator === true,
    ];
  }, [
    validityResponse,
    formContext?.hasBeenSubmitted,
    errorsForcedByValidator,
  ]);

  /**
   * It's a test to use useMemo instead. It makes the validation synchronous. Might not work with async validators
   */
  useMemo(() => {
    const response = validate(value, validators);
    setValidityResponse(response);

    /**
     * If the value is unreasonable then the validator can chose to active validation
     */
    if (response[0] === ValidationState.INVALID && response[2] === true) {
      setErrorsForcedByValidator(true);
    }

    /**
     * If the input has been valid then we activate validation
     */
    // if (response[0] === ValidationState.VALID) {
    //   /* TODO: Do a follow up on this */
    //   setErrorsForcedByValidator(true);
    // }

    /**
     * We do not want validators in here. This is to prevent new instances with the same logic
     * from running the validation to often
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, getComparators(validators)]);

  const serializedResponse = JSON.stringify(validityResponse);

  useEffect(() => {
    const deepCheckedResponse = JSON.parse(
      serializedResponse
    ) as ValidityResponse;

    const input = new Input({
      id,
      label: undefined,
      value: value,
      validationState: deepCheckedResponse[0],
      resetValidation: () => {},
      errors: deepCheckedResponse[1],
      scrollToRef,
    });
    const removeInput = formContext?.setInput(input);

    return () => {
      removeInput?.();
    };
  }, [formContext, id, value, scrollToRef, serializedResponse]);

  return response;
}

function validate(value: unknown, validators: Validator[]): ValidityResponse {
  const validationData = runValidators(value, validators);
  if (!isSyncStateList(validationData)) {
    throw new Error('Async validators are not yet supported');
  }

  if (isValid(validationData)) {
    return [ValidationState.VALID, []];
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

  return [ValidationState.INVALID, errors, forceErrors];
}

function runValidators(
  value: unknown,
  validators: Validator[]
): ValidationResponses[] {
  return validators.map((validator) => validator.validate(value));
}

function isSyncStateList(
  data: ValidationResponses[]
): data is ValidationData[] {
  return data.every(
    (data) =>
      typeof data === 'object' &&
      typeof (data as AsyncValidationData).then === 'undefined'
  );
}

function isValid(data: ValidationData[]) {
  return data.every((data) => data.state === ValidationState.VALID);
}

function getComparators(validators: Validator[]) {
  return validators.map((validator) => validator.getComparator()).join('|');
}
