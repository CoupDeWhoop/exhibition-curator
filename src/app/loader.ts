"use client";

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function myImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  return `https://www.artic.edu/iiif/2/${src}?w=${width}&q=${quality || 75}`;
}
