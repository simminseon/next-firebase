import type { PropsWithChildren } from 'react';

interface LabelProps {
  htmlFor: string;
}

function Label({ htmlFor, children }: PropsWithChildren<LabelProps>) {
  return (
    <label htmlFor={htmlFor} className="block mb-6">
      {children}
    </label>
  );
}

export default Label;
