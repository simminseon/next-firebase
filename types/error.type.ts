import { errorCodeMapping } from '@/utils/errorCodeMapping';

interface FirebaseError {
  code: keyof typeof errorCodeMapping;
  message: string;
}

export type Errors = FirebaseError | Error;
