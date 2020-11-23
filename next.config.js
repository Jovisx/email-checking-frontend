require('dotenv').config();

const withOffline = require('next-offline');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = withOffline({
  target: process.env.NEXT_TARGET || 'serverless',
  distDir: 'build',
  webpack: (config, { /* dev, */ isServer, webpack }) => {
    // For abosolute import
    /* eslint-disable dot-notation */
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['layouts'] = path.join(__dirname, 'layouts');
    config.resolve.alias['store'] = path.join(__dirname, 'store');
    config.resolve.alias['types'] = path.join(__dirname, 'types');
    config.resolve.alias['utils'] = path.join(__dirname, 'utils');
    config.resolve.alias['pages'] = path.join(__dirname, 'pages');
    config.resolve.alias['static'] = path.join(__dirname, 'static');
    config.resolve.alias['mocks'] = path.join(__dirname, 'mocks');
    config.resolve.alias['i18n'] = path.join(__dirname, 'i18n');
    /* eslint-enable dot-notation */

    config.plugins.push(new Dotenv());
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    // IMPORTANT: Do not remove this eslint-loader

    // if (dev) {
    //   config.module.rules.push({
    //     test: /\.(jsx?)$/,
    //     loader: 'eslint-loader',
    //     exclude: ['/node_modules/', '/.next/', '/build/'],
    //     enforce: 'pre',
    //     options: {
    //       quiet: true
    //     }
    //   });
    // }

    if (process.env.ANALYZE_BUILD === 'TRUE' || process.env.ANALYZE_BUILD === 'true') {
      // eslint-disable-next-line global-require
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        }),
      );
    }

    return config;
  },
  workboxOpts: {
    swDest: 'service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /[.](png|jpg|ico|svg|css)/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'assets-cache',
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/code\.getmdl\.io.*/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'lib-cache',
        },
      },
      {
        urlPattern: /^http.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'http-cache',
        },
      },
    ],
  },
});
