import { createContext, ForwardedRef, ReactNode } from 'react';
import { FormData } from '../FormData';
import { ValidationState } from '../validators/Validator';

export class Input {
  constructor(
    public id: string,
    public label: string | ReactNode,
    public value: unknown,
    public validationState: ValidationState,
    public resetValidation: () => void,
    public errors: string[] | undefined,
    public scrollToRef: ForwardedRef<HTMLElement>
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
  form: FormData;
  hasBeenSubmitted: boolean;
}

export const FormContext = createContext<FormContextInterface | undefined>(
  undefined
);
