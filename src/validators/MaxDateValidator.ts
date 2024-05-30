import { Temporal } from '@js-temporal/polyfill';
import { ValidationData, ValidationState, Validator } from './Validator';

export class MaxDateValidator extends Validator {
  protected id: string = 'MaxDateValidator';
  private maxDate: Temporal.PlainDate;

  constructor(maxDate: Temporal.PlainDate, error: string) {
    super(error);
    this.maxDate = maxDate;
  }

  validate(value: unknown): ValidationData {
    if (
      !(value instanceof Temporal.PlainDate) &&
      (typeof value !== 'string' || isValidDate(value))
    ) {
      return { state: ValidationState.VALID };
    }

    const date =
      value instanceof Temporal.PlainDate
        ? value
        : Temporal.PlainDate.from(value);

    if (Temporal.PlainDate.compare(this.maxDate, date) === -1) {
      return {
        state: ValidationState.INVALID,
        error: this.error,
        forceErrors: true,
      };
    }

    return { state: ValidationState.VALID };
  }

  public getComparator(): string {
    return this.id + '_' + this.error + '_' + this.maxDate.toString();
  }
}

function isValidDate(dateString: string) {
  try {
    Temporal.PlainDate.from(dateString);
    return true;
  } catch (e) {
    return false;
  }
}
