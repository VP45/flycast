/** @type {import('next').NextConfig} */
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: "loose"
  },
  images: { domains: ['flowbite.s3.amazonaws.com'] },
  reactStrictMode: false
}
module.exports = nextConfig
