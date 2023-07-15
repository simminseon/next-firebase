'use client';
import { useState, useEffect } from 'react';
import { getImageFromStorage } from '@/firebase';

export const useImageUrl = (uid: string) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (!uid) {
        setImageUrl(null);
        setImageLoading(false);
        return;
      }

      const url = await getImageFromStorage(uid);
      setImageUrl(url);
      setImageLoading(false);
    };

    fetchImage();
  }, [uid]);

  return { imageUrl, imageLoading };
};
