import { ReactNode } from 'react';
import Split from './Split';
import SplitShrink from './SplitShrink';

interface InputFieldProps {
  children: ReactNode;
}

function InputField({ children }: InputFieldProps) {
  return <div className="mb-20 last-of-type:mb-0">{children}</div>;
}

export default Object.assign(InputField, {
  Split: Split,
  SplitShrink: SplitShrink,
});
