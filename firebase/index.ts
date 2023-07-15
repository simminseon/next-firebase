import { db, auth, storage } from './firebase';
import { createUserProfile } from './auth/createUserProfile';
import { loginWithEmailAndPassword } from './auth/loginWithEmailAndPassword';
import { addUserInfoToDB } from './firestore/addUserInfoToDB';
import { fetchUser } from './firestore/fetchUser';
import { getImageFromStorage } from './storage/getImageFromStorage';
import { uploadImageToStorage } from './storage/uploadImageToStorage';

export {
  db,
  auth,
  storage,
  createUserProfile,
  loginWithEmailAndPassword,
  addUserInfoToDB,
  fetchUser,
  getImageFromStorage,
  uploadImageToStorage,
};
