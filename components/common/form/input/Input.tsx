'use client';
import { forwardRef, Ref } from 'react';
import type { ChangeEvent } from 'react';
import classNames from 'classnames';

interface InputProps {
  type?: 'text' | 'password' | 'email';
  id?: string;
  error?: boolean;
  className?: string;
  placeholder?: string;
  value?: string;
}

function Input(
  { type = 'text', id, error = false, className, ...rest }: InputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      type={type}
      id={id}
      className={classNames(
        'input-comm',
        {
          error: error,
        },
        className
      )}
      {...rest}
    />
  );
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
