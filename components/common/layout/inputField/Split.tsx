import { ReactNode } from 'react';

interface SplitProps {
  children: ReactNode;
}

function Split({ children }: SplitProps) {
  return <div className="flex">{children}</div>;
}

export default Split;
