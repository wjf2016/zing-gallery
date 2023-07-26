const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const resolve = (p) => path.resolve(__dirname, p);
const { NODE_ENV } = process.env;

module.exports = {
  entry: {
    main: resolve('./assets/src/main.js'),
  },
  output: {
    path: resolve('./assets/dist'),
    publicPath: './',
    filename: '[name].js',
  },
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|png)\??.*$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: resolve('./assets/src/img/avatar.png'),
          to: resolve('./assets/dist/img/'),
        },
      ],
    }),
  ],
  watch: NODE_ENV === 'development',
};
