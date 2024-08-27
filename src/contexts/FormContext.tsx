import React, { createContext, RefObject } from 'react';
import { ValidationState } from '../validators/Validator';

export class Input {
  constructor(
    public id: string,
    public label: string | React.ReactNode,
    public value: unknown,
    public validationState: ValidationState,
    public resetValidation: () => void,
    public errors: string[] | undefined,
    public scrollToRef: RefObject<HTMLElement>
  ) {}

  /**
   * Computed values
   */
  public get isValid() {
    return this.validationState === ValidationState.VALID;
  }

  public get isInvalid() {
    return this.validationState !== ValidationState.VALID;
  }
}

export interface FormContextInterface {
  setInput(input: Input): () => void;
  hasBeenSubmitted: boolean;
}

export const FormContext = createContext<FormContextInterface | undefined>(
  undefined
);
