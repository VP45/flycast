/** @type {import('next').NextConfig} */
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: "loose"
  },
  images: { domains: ['flowbite.s3.amazonaws.com', 'ui-avatars.com'] },
  reactStrictMode: false
}
module.exports = {
  ...nextConfig,
  env:{
    MONGO_URI: process.env.MONGO_URI,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
  }
}
