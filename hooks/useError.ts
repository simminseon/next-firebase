'use client';
import { useState } from 'react';
import { Errors } from '@/types/error.type';
import { errorCodeMapping } from '@/utils/errorCodeMapping';

export const useError = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleError = (error: Errors) => {
    if ('code' in error) {
      setErrorMessage(errorCodeMapping[error.code] || error.message);
    } else {
      setErrorMessage(error.message);
    }
  };

  return { errorMessage, handleError };
};
