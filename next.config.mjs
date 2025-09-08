/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [100, 75, 50],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-5c15a84b97fc4cc889a06969fb95be5f.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
