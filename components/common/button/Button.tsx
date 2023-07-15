import { MouseEvent } from 'react';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';

interface ButtonProps {
  type?: 'button' | 'submit';
  size?: 'sm' | 'md';
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

function Button({
  type = 'button',
  size = 'md',
  disabled,
  children,
  onClick,
  className,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={classNames(
        'bg-primary text-white rounded-md font-bold ',
        {
          'h-40 px-10 text-sm': size === 'sm',
          'h-50 w-full': size === 'md',
          'opacity-40': disabled,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
