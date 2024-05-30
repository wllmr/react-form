import { Validator, ValidationState, ValidationData } from "./Validator";

export class NumberValidator extends Validator {
  protected id: string = "NumberValidator";

  validate(value: unknown): ValidationData {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.length === 0)
    ) {
      return { state: ValidationState.VALID };
    }

    const parsedNumber = Number(value);

    if (isNaN(parsedNumber)) {
      return {
        state: ValidationState.INVALID,
        error: this.error,
        forceErrors: true,
      };
    }

    return { state: ValidationState.VALID };
  }
}
