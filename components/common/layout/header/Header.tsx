import type { ReactNode } from 'react';
import classNames from 'classnames';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

function Header({ children, className }: HeaderProps) {
  return (
    <header
      className={classNames('container flex items-center border-b border-gray-200 h-50', className)}
    >
      <h1 className="text-lg font-bold">{children}</h1>
    </header>
  );
}

export default Header;
