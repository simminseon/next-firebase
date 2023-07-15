import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { auth, db } from '@/firebase';
import { TRegister } from '@/types/register.type';

export const addUserInfoToDB = async (data: TRegister) => {
  const user = auth.currentUser;
  const collectionRef = collection(db, 'users');
  const docRef = doc(collectionRef, user?.uid);

  await setDoc(docRef, {
    id: user?.uid,
    email: data.email,
    password: data.password,
    name: data.name,
    phoneNumber: data.phoneNumber,
    region: data.region,
  });
};
