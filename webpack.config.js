const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildPath = './build';

module.exports = {
  mode: 'development',
  entry: './client/index.tsx',
  output: {
    path: path.resolve(__dirname, buildPath),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: './index.html',
    })
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, buildPath),
      publicPath: 'http://localhost:8080/'
    },
    compress: true,
    port: 8080, 
    // proxy: [
    // {
    //     '/**': 'http://localhost:3000',
    //   },
    // ]
  }  ,

};