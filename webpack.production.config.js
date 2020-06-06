const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/index.js'],
  },
  plugins: [
    // new LodashModuleReplacementPlugin({
    //   shorthands: true,
    // }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
    }),
    // new CopyWebpackPlugin([{ from: './index.html', to: '' }]),
    new CopyWebpackPlugin([{ from: './src/4_assets', to: 'assets' }]),
    new HTMLWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    // new HtmlWebpackTagsPlugin({ tags: ['index.css'], append: true }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  //   module: {
  //     rules: [
  //       {
  //         test: /\.js$/,
  //         include: [path.resolve(__dirname, '10_app')],
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env']
  //         }
  //       }
  //     ]
  //   }
};
