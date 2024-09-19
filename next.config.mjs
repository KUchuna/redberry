/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/listings',
                permanent: true,
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.real-estate-manager.redberryinternship.ge'
            }
        ]
    }
};

export default nextConfig;
