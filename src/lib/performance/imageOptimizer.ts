interface ImageDimensions {
  width: number;
  height: number;
}

interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  dimensions?: ImageDimensions;
}

export function getOptimizedImageUrl(
  url: string,
  options: ImageOptimizationOptions = {}
): string {
  const { quality = 80, format = 'webp', dimensions } = options;

  // If it's an Unsplash image, use their optimization API
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    const params = new URLSearchParams({
      q: quality.toString(),
      fm: format,
      ...(dimensions && {
        w: dimensions.width.toString(),
        h: dimensions.height.toString(),
      }),
    });
    return `${baseUrl}?${params.toString()}`;
  }

  // For other images, return original URL
  return url;
}

export function generateSrcSet(
  url: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536]
): string {
  return widths
    .map(width => {
      const optimizedUrl = getOptimizedImageUrl(url, {
        dimensions: { width, height: Math.round(width * 0.5625) }, // 16:9 aspect ratio
      });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}