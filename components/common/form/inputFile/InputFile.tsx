'use client';
import { forwardRef, Ref, useRef } from 'react';
import type { ChangeEvent } from 'react';
import classNames from 'classnames';

type FileValue = File | string;
type FileErrorType = 'size' | 'extension';

interface InputFileProps {
  id?: string;
  className?: string;
  error?: boolean;
  placeholder?: string;
  value?: any;
  onChange?: (file: File) => void;
}

function InputFile(
  { id, value, error = false, className, onChange, ...rest }: InputFileProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      type="file"
      value={value}
      id={id}
      accept="image/jpg, image/jpeg, image/png, image/gif"
      className={className}
      // readOnly
      onChange={({ target }) => {
        const file = ((target as HTMLInputElement).files as FileList)[0];
        onChange?.(file);
        // console.log(file);
      }}
      {...rest}
    />
  );
}

export default forwardRef<HTMLInputElement, InputFileProps>(InputFile);
