"use client";

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

function chicagoImageLoader({ src, width, quality }: ImageLoaderProps): string {
  return `https://www.artic.edu/iiif/2/${src}?w=${width}&q=${quality || 75}`;
}

function scienceImageLoader({ src, width, quality }: ImageLoaderProps): string {
  return `https://coimages.sciencemuseumgroup.org.uk/${src}?w=${width}&q=${
    quality || 75
  }`;
}

export { chicagoImageLoader, scienceImageLoader };
