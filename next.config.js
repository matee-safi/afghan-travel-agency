/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        // Optionally add port/path restrictions:
        // port: "",
        // pathname: "/your-path/**",
      },
    ],
  },
};

module.exports = nextConfig;
