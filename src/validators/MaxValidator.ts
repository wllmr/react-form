import { Validator, ValidationState, ValidationData } from "./Validator";

export class MaxValidator extends Validator {
  protected id: string = "MaxValidator";
  private max: number;

  constructor(max: number, error: string) {
    super(error);
    this.max = max;
  }

  validate(value: unknown): ValidationData {
    const parsedValue = Number(value);
    if (!isNaN(parsedValue) && parsedValue > this.max) {
      return {
        state: ValidationState.INVALID,
        error: this.error,
        forceErrors: true,
      };
    }

    return { state: ValidationState.VALID };
  }

  public getComparator(): string {
    return this.id + "_" + this.error + "_" + this.max;
  }
}
