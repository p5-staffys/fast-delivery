/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config) => {
    config.watchOptions = {
      ignored: [],
      aggregateTimeout: 300,
      poll: 0,
    };
    return config;
  }, 
  experimental: {
    appDir: true,
  },
}
