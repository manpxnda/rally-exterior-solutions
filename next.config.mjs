/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Allow remote images from common asset hosts. Add your CDN / storage host here
  // when you move photos off the /public folder (e.g. Cloudinary, Vercel Blob, S3).
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async redirects() {
    // 301 redirects to capture traffic from the OLD SiteGround site's indexed
    // URLs so nothing is wasted. Add more here if Search Console shows others.
    return [
      // Old domain rallyohv.com → current site, preserving the path. The path
      // rules below then map old paths (e.g. /house-washing) to the new pages.
      {
        source: "/:path*",
        has: [{ type: "host", value: "rallyohv.com" }],
        destination: "https://rallyexteriorsolutions.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rallyohv.com" }],
        destination: "https://rallyexteriorsolutions.com/:path*",
        permanent: true,
      },
      // Vanity short link for review requests (QR cards, in-person asks,
      // past-customer texts). Temporary (307) so the Google destination can be
      // changed later without reprinting any QR codes.
      {
        source: "/review",
        destination: "https://g.page/r/CaY2UgCpz3LrEAI/review",
        permanent: false,
      },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us.html", destination: "/contact", permanent: true },
      { source: "/house-washing", destination: "/services/house-washing", permanent: true },
      { source: "/house-washing.html", destination: "/services/house-washing", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/cleaning", destination: "/services", permanent: true },
      { source: "/cleaning.html", destination: "/services", permanent: true },
      { source: "/lighting", destination: "/services/permanent-lighting", permanent: true },
      { source: "/lighting.html", destination: "/services/permanent-lighting", permanent: true },
      { source: "/christmas-lighting", destination: "/services/holiday-lighting", permanent: true },
      { source: "/christmas-lighting.html", destination: "/services/holiday-lighting", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      // Removed service → closest current page
      { source: "/services/soft-washing", destination: "/services/house-washing", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
