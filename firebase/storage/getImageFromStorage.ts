import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';

export const getImageFromStorage = async (uid: string) => {
  const imageRef = ref(storage, `profile/${uid}`);
  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error(error);
    return null;
  }
};
