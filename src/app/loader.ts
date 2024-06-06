"use client";

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

function chicagoImageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith("/images")) {
    // local asset
    return `${src}?w=${width}&q=${quality || 75}`;
  } else {
    return `https://www.artic.edu/iiif/2/${src}?w=${width}&q=${quality || 75}`;
  }
}

function scienceImageLoader({ src, width, quality }: ImageLoaderProps): string {
  return `https://coimages.sciencemuseumgroup.org.uk/${src}?w=${width}&q=${
    quality || 75
  }`;
}

function harvardImageLoader({ src, width, quality }: ImageLoaderProps): string {
  const path = src.split("https://nrs.harvard.edu/urn-3:HUAM:")[1];
  console.log(path);
  return `https://nrs.harvard.edu/urn-3:HUAM:${path}?w=${width}&q=${
    quality || 75
  }`;
}

export { chicagoImageLoader, scienceImageLoader, harvardImageLoader };
