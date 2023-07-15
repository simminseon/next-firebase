import React from 'react';
import { PropsWithChildren } from 'react';

function ErrorMessage({ children }: PropsWithChildren) {
  return <em className="block mt-5 text-sm not-italic whitespace-pre-line text-red">{children}</em>;
}

export default ErrorMessage;
