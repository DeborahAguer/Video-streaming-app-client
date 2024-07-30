/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    esmExternals: false,
  },
  eslint: {
    dirs: ['src'],
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      exclude: /node_modules/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
            svgo: true,
          },
        },
      ],
    });

    return config;
  },
  ...(process.env.APPLICATION_MODE === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
};
