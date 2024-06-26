import React, {
  DetailedHTMLProps,
  FormEvent,
  FunctionComponent,
  ReactNode,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
import { FormContext, Input } from "./contexts/FormContext";
import { ValidationState } from "./validators/Validator";

interface Props
  extends Omit<
    DetailedHTMLProps<React.HTMLAttributes<HTMLFormElement>, HTMLFormElement>,
    "onSubmit"
  > {
  onSubmit?: (form: FormData, event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: FunctionComponent<Props> = memo(
  ({ children, onSubmit, ...props }) => {
    const formData = useRef(new FormData());
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

    const internalOnSubmit = useCallback(
      (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.persist();
        setHasBeenSubmitted(true);

        if (formData.current.isInvalid) {
          formData.current.inputs
            .find((input) => input.isInvalid)
            ?.scrollToRef.current?.scrollIntoView({
              behavior: "smooth",
              inline: "center",
            });
        }

        onSubmit?.(formData.current, event);
      },
      [onSubmit]
    );

    const setInput = useCallback((input: Input) => {
      return formData.current.setInput(input);
    }, []);

    return (
      <form onSubmit={internalOnSubmit} {...props} noValidate>
        <FormContext.Provider value={{ setInput, hasBeenSubmitted }}>
          <ReRenderProtection>{children}</ReRenderProtection>
        </FormContext.Provider>
      </form>
    );
  }
);
Form.displayName = "Form";

const ReRenderProtection = memo(({ children }: { children: ReactNode }) => {
  return <React.Fragment>{children}</React.Fragment>;
});
ReRenderProtection.displayName = "ReRenderProtection";

class FormData {
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
