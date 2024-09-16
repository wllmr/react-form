import { cx } from 'class-variance-authority';
import { ComponentProps } from 'react';

interface LabelProps
  extends Pick<ComponentProps<'label'>, 'className' | 'htmlFor' | 'children'> {}

export const Label = ({ className, ...props }: LabelProps) => {
  if (!props.children) {
    return null;
  }

  return <label {...props} className={cx('font-bold text-sm', className)} />;
};
