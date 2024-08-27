import { ValidationProps } from '../validators/Validator';
import { LabelProps } from './Label';

export interface TestProps {
  ['data-testid']?: string;
}

export interface InputBaseProps<TValue>
  extends Pick<LabelProps, 'label'>,
    TestProps,
    ValidationProps {
  className?: string;
  value?: TValue;
  onChange?: (value: TValue | undefined) => void;
}
