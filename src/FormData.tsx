import { Input } from './contexts/FormContext';
import { ValidationState } from './validators/Validator';

export class FormData {
  public inputs: Input[] = [];

  setInput(newInput: Input) {
    const existingIdx = this.inputs.findIndex(
      (input) => input.id === newInput.id
    );
    if (existingIdx > -1) {
      this.inputs.splice(existingIdx, 1, newInput);
    } else {
      this.inputs.push(newInput);
    }

    return () => {
      const existingIdx = this.inputs.findIndex(
        (input) => input.id === newInput.id
      );
      if (existingIdx > -1) {
        this.inputs.splice(existingIdx, 1);
      }
    };
  }

  resetValidation() {
    this.inputs.forEach((input) => input.resetValidation());
  }

  get isValid(): boolean {
    return this.inputs.every((input) => input.isValid);
  }

  get isInvalid(): boolean {
    return !this.inputs.every((input) => input.isValid);
  }

  get isPending(): boolean {
    return this.inputs.some(
      (input) => input.validationState === ValidationState.PENDING
    );
  }
}
