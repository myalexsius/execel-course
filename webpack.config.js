function newFunction() {
  const path = require('path');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const HTMLWebpackPlugin = require('html-webpack-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  const isProd = process.env.NODE_ENV === 'production';
  const isDev = !isProd;
  const jsLoaders = () => {
    const loaders = [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ];
    if (isDev) {
      loaders.push('eslint-loader');

    }
    return loaders;
  };

  const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

  console.log('IS PROD', isProd);
  console.log('IS DEV', isDev);

  module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: isDev ? 'development' : 'production',
    entry: './index.js',
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'core': path.resolve(__dirname, 'src/core'),
      },
    },

    devtool: isDev ? 'source-map' : false,

    devServer: {
      port: 3000,
      hot: isDev
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
        template: 'index.html',
        minify: {
          removeComments: isProd,
          collapseWhitespace: isProd,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'favicon.ico', to: '' },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: jsLoaders()
        },
      ],
    },
  };
}

