import React from 'react';
import { useImageLoader } from '@/lib/hooks/useImageLoader';
import { getOptimizedImageUrl, generateSrcSet } from '@/lib/performance/imageOptimizer';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lowResSrc?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

export default function Image({
  src,
  alt,
  lowResSrc,
  aspectRatio = '16:9',
  className,
  ...props
}: ImageProps) {
  const { currentSrc, isLoading, error } = useImageLoader({
    src: getOptimizedImageUrl(src),
    lowResSrc,
    alt,
  });

  const aspectRatioClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square',
  }[aspectRatio];

  if (error) {
    return (
      <div className={cn(
        'bg-gray-100 flex items-center justify-center text-gray-500',
        aspectRatioClass,
        className
      )}>
        Failed to load image
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', aspectRatioClass, className)}>
      <img
        src={currentSrc}
        srcSet={generateSrcSet(src)}
        alt={alt}
        loading="lazy"
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
}