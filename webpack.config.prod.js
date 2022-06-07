const { merge } = require('webpack-merge');
//const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.config.base');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  },
  // optimization: {
  //   minimizer: [
  //     new TerserWebpackPlugin({
  //       terserOptions: {
  //         compress: {
  //           drop_console: true,
  //         },
  //         sourceMap: true,
  //       },
  //       parallel: true,
  //     }),
  //   ],
  // chunkIds: 'named',
  // moduleIds: 'deterministic',
  // splitChunks: {
  //   name: false,
  //   chunks: 'all',
  //   minChunks: 1,
  //   // maxAsyncRequests: 5,
  //   // maxInitialRequests: 5,
  //   cacheGroups: {
  //     vendor: {
  //       test: /node_modules/,
  //       name: 'vendor',
  //       chunks: 'all',
  //       enforce: true,
  //     },
  //     react: {
  //       test: /react|react-dom|mobx|prop-type/,
  //       name: 'react',
  //       priority: 10,
  //       chunks: 'initial',
  //       enforce: true,
  //     },
  //   },
  // },
  // runtimeChunk: {
  //   name: (entrypoint) => `runtime-${entrypoint.name}`,
  // },
  // },
  // plugins: [
  //   new BundleAnalyzerPlugin({
  //     analyzerMode: 'static',
  //     openAnalyzer: false,
  //     reportFilename: 'bundle_sizes.html',
  //   }),
  // ],
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
});
