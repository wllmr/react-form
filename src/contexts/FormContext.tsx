import { createContext, ReactNode } from 'react';
import { ValidationState } from '../validators/Validator';

export class Input {
  constructor(
    public id: string,
    public label: string | ReactNode,
    public value: unknown,
    public validationState: ValidationState,
    public resetValidation: () => void,
    public errors: string[] | undefined,
    public scrollToId: string
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
  formErrors: Record<string, string[]>;
  setFormErrors: (inputId: string, errors: string[]) => void;
  setInput(input: Input): () => void;
  hasBeenSubmitted: boolean;
}

export const FormContext = createContext<FormContextInterface | undefined>(
  undefined
);
