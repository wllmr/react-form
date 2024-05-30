import { Validator, ValidationState, ValidationData } from "./Validator";

/**
 * https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
 *
 * const EMAIL_ASCII_PATTER =
 * /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 */
const EMAIL_UNICODE_PATTER =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export class EmailValidator extends Validator {
  protected id: string = "EmailValidator";

  validate(value: unknown): ValidationData {
    if (
      typeof value === "string" &&
      value.length > 0 &&
      !value.toLowerCase().match(EMAIL_UNICODE_PATTER)
    ) {
      return { state: ValidationState.INVALID, error: this.error };
    }

    return { state: ValidationState.VALID };
  }
}
