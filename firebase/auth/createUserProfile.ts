import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase';

interface createUserProfileProps {
  email: string;
  password: string;
  name: string;
}

export const createUserProfile = async ({
  email,
  password,
  name,
}: createUserProfileProps) => {
  let createdUser = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(createdUser.user, {
    displayName: name,
  });
};
