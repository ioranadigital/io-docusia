/** @type {import('next).NextConfig} */
const nextConfig = {
  // Use default output (not standalone) - simpler, no prerendering issues
  reactStrictMode: true,

  async redirects() {
    return [
      // QR con URL amigable: /r/* se reenvía al resolver de qr.iorana.dev
      {
        source: "/r/:path*",
        destination: "https://qr.iorana.dev/slug/docusia.com/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
