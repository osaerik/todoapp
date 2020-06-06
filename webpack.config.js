const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: ['./src/index.js'],
  },
  plugins: [
    // new LodashModuleReplacementPlugin({
    //   shorthands: true,
    // }),
    // new CleanWebpackPlugin({
    //   cleanStaleWebpackAssets: false,
    // }),
    // new CopyWebpackPlugin([{ from: './index.html', to: '' }]),
    new CopyWebpackPlugin([{ from: './src/4_assets', to: 'assets' }]),
    new HTMLWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      inject: 'body',
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          'postcss-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    // minimize: false,
    // minimizer: [new TerserPlugin()],
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
