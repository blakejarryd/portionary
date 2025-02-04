/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: process.env.NODE_ENV === 'production' ? '/portionary' : '',
    webpack: (config, { isServer }) => {
        // Ignore punycode warning
        config.ignoreWarnings = [
            { module: /node_modules\/punycode/ }
        ];
        return config;
    }
}

module.exports = nextConfig 