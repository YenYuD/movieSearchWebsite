const { withPlaiceholder } = require("@plaiceholder/next");
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const { i18n } = require("./next-i18next.config");

const nextConfig = {
    i18n,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                port: "",
                pathname: "/t/**",
            },
        ],
    },
};

module.exports = withBundleAnalyzer(withPlaiceholder(nextConfig));
