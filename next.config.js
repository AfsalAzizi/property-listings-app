/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'luxhabitat.ae',
            },
            {
                protocol: 'https',
                hostname: 'static.zawya.com',
            }
        ],
    },
}

module.exports = nextConfig 