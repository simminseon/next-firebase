import {
  getStorage,
  ref as strRef,
  uploadBytesResumable,
} from 'firebase/storage';
import { auth } from '@/firebase';

export const uploadImageToStorage = async (file: File) => {
  const user = auth.currentUser;
  const storage = getStorage();

  if (file) {
    const metadata = { contentType: file.type };
    let uploadTasknapshop = uploadBytesResumable(
      strRef(storage, `profile/${user?.uid}`),
      file,
      metadata
    );

    uploadTasknapshop.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log('default');
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
          default:
            console.log(error.message);
        }
      }
    );
  }
};
