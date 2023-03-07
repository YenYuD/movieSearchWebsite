const { withPlaiceholder } = require("@plaiceholder/next");
/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = withPlaiceholder(nextConfig);
