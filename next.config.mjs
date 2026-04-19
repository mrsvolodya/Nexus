/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Clickjacking protection
  { key: "X-Frame-Options", value: "DENY" },
  // MIME-sniffing protection
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer policy — send origin only cross-site
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Feature-policy — disable access we don't use
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  },
  // XSS filter — legacy but harmless
  { key: "X-XSS-Protection", value: "0" },
  // HSTS — force HTTPS for a year. Safe on Vercel.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Cross-origin isolation
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["motion", "lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
