/* eslint-disable no-console */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageFile = require('./package.json');

const NODE_ENV = process.env.NODE_ENV || 'development';
const banner = `${packageFile.name} - ${packageFile.version}`;
const PATHS = {
  build: path.resolve(__dirname, 'dist'),
};

const env = {
  APP_NAME: packageFile.name,
  NODE_ENV,
  VERSION: packageFile.version,
};
console.log('Using environments:');
console.log(env);

const config = {
  mode: NODE_ENV,

  entry: ['./client/index.jsx'],

  output: {
    filename: `${packageFile.name}.js`,
    path: PATHS.build,
    publicPath: '',
  },

  target: 'web',

  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],

    modules: [
      path.resolve(__dirname, 'client', 'components'),
      path.resolve(__dirname, 'client'),
      'node_modules',
    ],
  },

  devServer: {
    hot: true,
    inline: true,
    contentBase: PATHS.build,
    host: '0.0.0.0',
    historyApiFallback: true,
  },

  devtool: NODE_ENV === 'production' ? undefined : 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=/assets/images/[name].[ext]',
        options: {
          name: 'assets/images/[name].[ext]',
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.EnvironmentPlugin(env),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Get Prime Medians',
      template: './client/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: `${packageFile.name}.css`,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

if (NODE_ENV === 'production') {
  config.optimization = {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        parallel: true,
      }),
    ],
  };
}

module.exports = config;
