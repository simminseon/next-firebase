'use client';
import { useState } from 'react';
import { uploadImageToStorage } from '@/firebase';

export const useUploadImageFile = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const uploadImageFile = async () => {
    if (imageFile) {
      await uploadImageToStorage(imageFile);
    }
  };

  return { imageFile, setImageFile, uploadImageFile };
};
