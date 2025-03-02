import {
  DetailedHTMLProps,
  FormEvent,
  forwardRef,
  HTMLAttributes,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { FormContext, Input } from './contexts/FormContext';
import { FormData } from './FormData';

export interface FormHandle {
  formData: FormData;
  submit: () => void;
}

interface FormProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>,
    'onSubmit'
  > {
  onSubmit?: (form: FormData, event?: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = memo(
  forwardRef<FormHandle, FormProps>(({ children, onSubmit, ...props }, ref) => {
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
    const [formErrors, _setFormErrors] = useState<Record<string, string[]>>({});
    const formData = useRef(new FormData());

    const internalOnSubmit = useCallback(
      (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        event?.persist();
        setHasBeenSubmitted(true);

        if (formData.current.isInvalid) {
          const input = formData.current.inputs.find(
            (input) => input.isInvalid
          );

          if (input === null || typeof input === 'undefined') {
            return;
          }

          document.getElementById(input.scrollToId)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }

        onSubmit?.(formData.current, event);
      },
      [onSubmit]
    );

    const formErrorsRef = useRef<Record<string, string[]>>({});
    const setFormErrors = useCallback((inputId: string, errors: string[]) => {
      const currentErrors = formErrorsRef.current[inputId] || [];
      if (JSON.stringify(currentErrors) === JSON.stringify(errors)) return;

      formErrorsRef.current[inputId] = errors;
      _setFormErrors({ ...formErrorsRef.current });
    }, []);

    const setInput = useCallback((input: Input) => {
      return formData.current.setInput(input);
    }, []);

    useImperativeHandle(ref, () => ({
      formData: formData.current,
      submit: internalOnSubmit,
    }));

    return (
      <form onSubmit={internalOnSubmit} {...props} noValidate>
        <FormContext.Provider
          value={{
            formErrors: formErrors,
            setFormErrors,
            setInput,
            hasBeenSubmitted,
          }}
        >
          {children}
        </FormContext.Provider>
      </form>
    );
  })
);
Form.displayName = 'Form';
