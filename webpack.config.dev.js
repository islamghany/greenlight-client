const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.base');
module.exports = merge(baseConfig, {
  mode: 'development',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
});
