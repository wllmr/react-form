import { Validator, ValidationState, ValidationData } from "./Validator";

export class TruthyValidator extends Validator {
  protected id: string = "TruthyValidator";

  validate(value: unknown): ValidationData {
    if (value !== true) {
      return { state: ValidationState.INVALID, error: this.error };
    }

    return { state: ValidationState.VALID };
  }
}
