/* eslint-disable react-refresh/only-export-components */
export { Form } from './Form';

export { ValidationState, Validator } from './validators/Validator';
export type {
  AsyncValidationData,
  InvalidValidationData,
  PendingValidationData,
  ValidValidationData,
  ValidationData,
  ValidationProps,
  ValidationResponse as ValidationResponses,
} from './validators/Validator';

import { EmailValidator } from './validators/EmailValidator';
import { MaxDateValidator } from './validators/MaxDateValidator';
import { MaxLengthValidator } from './validators/MaxLengthValidator';
import { MaxValidator } from './validators/MaxValidator';
import { MinDateValidator } from './validators/MinDateValidator';
import { MinLengthValidator } from './validators/MinLengthValidator';
import { NumberValidator } from './validators/NumberValidator';
import { RequiredValidator } from './validators/RequiredValidator';
import { TruthyValidator } from './validators/TruthyValidator';
export const validators = {
  EmailValidator,
  MaxDateValidator,
  MaxLengthValidator,
  MaxValidator,
  MinDateValidator,
  MinLengthValidator,
  NumberValidator,
  RequiredValidator,
  TruthyValidator,
};

export * from './hooks/useValidation';
