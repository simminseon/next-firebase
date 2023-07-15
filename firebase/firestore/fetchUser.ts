import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from '@/firebase';
import { TUser } from '@/types/auth.type';

export const fetchUser = async (uid: string) => {
  const usersCollection = collection(db, 'users');
  const emailQuery = query(usersCollection, where('id', '==', uid));
  const querySnapshot = await getDocs(emailQuery);
  return querySnapshot.docs.map((doc) => doc.data() as TUser);
};
