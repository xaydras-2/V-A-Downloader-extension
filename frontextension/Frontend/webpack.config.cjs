const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    app: "./src/index.tsx",
    background: "./src/background.tsx", // Add your background script here
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },

  devtool: 'source-map',

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../../Backend/.env'), // specify your .env path
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Make sure the path is correct
      chunks: ["app"], // Only include the 'app' chunk in your HTML
    }),
    
    new CopyWebpackPlugin({
      patterns: [
        { from: "./public", to: "" }, // Copy the 'public' folder to the root of 'dist'
      ],
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
