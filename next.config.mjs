/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "c6d7-103-156-118-15.ngrok-free.app",
    //     pathname: "/uploads/**",
    //   },
    // ],
    remotePatterns: [new URL('https://c6d7-103-156-118-15.ngrok-free.app/uploads/**')],
  },
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/default",
        permanent: false,
      },
    ];
  },
}

console.log("NEXT CONFIG LOADED");

export default nextConfig
