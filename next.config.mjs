/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disables strict mode to reduce warnings
    devIndicators: {
        buildActivity: false, // Disables the build activity indicator
        buildActivityPosition: 'bottom-right' // Positions the indicator (optional)
    },
    images: {
        domains: ['lh3.googleusercontent.com']
    }
};

export default nextConfig;
