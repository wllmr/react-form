import {
  AsyncValidationData,
  ValidationState,
  Validator,
} from '../src/validators/Validator';

export class AsyncMinLengthValidator extends Validator {
  protected id: string = 'AsyncMinLengthValidator';
  private minLength: number;

  constructor(minLength: number, error: string) {
    super(error);
    this.minLength = minLength;
  }

  async validate(value: unknown): AsyncValidationData {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (typeof value === 'string' && value.length > this.minLength) {
      return {
        state: ValidationState.INVALID,
        error: this.error,
        forceErrors: true,
      };
    }

    return { state: ValidationState.VALID };
  }

  public getComparator(): string {
    return this.id + '_' + this.error + '_' + this.minLength;
  }
}
