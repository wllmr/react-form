import {
  DetailedHTMLProps,
  FormEvent,
  HTMLAttributes,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
import { FormContext, Input } from './contexts/FormContext';
import { FormData } from './FormData';

interface FormProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>,
    'onSubmit'
  > {
  onSubmit?: (form: FormData, event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = memo(({ children, onSubmit, ...props }: FormProps) => {
  const formData = useRef(new FormData());
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  const internalOnSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.persist();
      setHasBeenSubmitted(true);

      if (formData.current.isInvalid) {
        const input = formData.current.inputs.find((input) => input.isInvalid);

        if (input === null || typeof input === 'undefined') {
          return;
        }

        // We don't need to handle the function case
        if (typeof input.scrollToRef !== 'function') {
          input.scrollToRef?.current?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
          });
        }
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
      <FormContext.Provider
        value={{ form: formData.current, setInput, hasBeenSubmitted }}
      >
        {children}
      </FormContext.Provider>
    </form>
  );
});
Form.displayName = 'Form';
