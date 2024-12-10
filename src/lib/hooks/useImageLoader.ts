import { useState, useEffect } from 'react';

interface ImageLoaderOptions {
  src: string;
  lowResSrc?: string;
  alt: string;
}

export function useImageLoader({ src, lowResSrc, alt }: ImageLoaderOptions) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentSrc, setCurrentSrc] = useState(lowResSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setError(new Error(`Failed to load image: ${alt}`));
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, alt]);

  return { currentSrc, isLoading, error };
}