/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Specify directories to lint when running `next lint` or during builds
    dirs: ['app', 'components', 'lib', 'utils'],

    // If you want to disable linting during production builds
    // ignoreDuringBuilds: false,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;
