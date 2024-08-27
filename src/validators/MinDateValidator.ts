import { Temporal } from '@js-temporal/polyfill';
import { ValidationData, ValidationState, Validator } from './Validator';

export class MinDateValidator extends Validator {
  protected id: string = 'MinDateValidator';
  private minDate: Temporal.PlainDate;

  constructor(minDate: Temporal.PlainDate, error: string) {
    super(error);
    this.minDate = minDate;
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

    if (Temporal.PlainDate.compare(this.minDate, date) === 1) {
      return {
        state: ValidationState.INVALID,
        error: this.error,
        forceErrors: true,
      };
    }

    return { state: ValidationState.VALID };
  }

  public getComparator(): string {
    return this.id + '_' + this.error + '_' + this.minDate.toString();
  }
}

function isValidDate(dateString: string) {
  try {
    Temporal.PlainDate.from(dateString);
    return true;
  } catch {
    return false;
  }
}
