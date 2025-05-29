/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "luxhabitat.ae",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.zawya.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
