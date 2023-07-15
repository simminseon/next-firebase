import classNames from 'classnames';
import type { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
  className?: string;
}

function Main({ children, className }: MainProps) {
  return (
    <main className={classNames('pt-20 pb-30', className)}>{children}</main>
  );
}

export default Main;
