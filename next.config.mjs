/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/app/loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.artic.edu",
        port: "",
        pathname: "/iiif/2/**",
      },
    ],
  },
};

export default nextConfig;
