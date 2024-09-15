import { ReactNode } from 'react';
import { ValidationProps } from '../../../src';

export interface TestProps {
  ['data-testid']?: string;
}

// export interface InputBaseProps<TValue> extends TestProps, ValidationProps {
export interface InputBaseProps extends TestProps, ValidationProps {
  className?: string;
  label?: ReactNode;
  // value?: TValue;
  // onChange?: (value: TValue | undefined) => void;
}
