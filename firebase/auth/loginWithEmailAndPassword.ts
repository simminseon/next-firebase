import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from 'firebase/auth';
import { auth } from '@/firebase';
import { TLogin } from '@/types/auth.type';

export const loginWithEmailAndPassword = async ({
  email,
  password,
}: TLogin) => {
  await setPersistence(auth, browserSessionPersistence);
  await signInWithEmailAndPassword(auth, email, password);
};
