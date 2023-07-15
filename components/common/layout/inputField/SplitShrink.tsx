import { ReactNode } from 'react';

interface SplitShrinkProps {
  children: ReactNode;
}

function SplitShrink({ children }: SplitShrinkProps) {
  return <div className="ml-10 shrink-0">{children}</div>;
}

export default SplitShrink;
