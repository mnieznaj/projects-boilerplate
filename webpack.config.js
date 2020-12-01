const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const path = require("path");

const commonConfig = merge([
  {
    entry: ["./src"],
    output: {
      filename: '[name].[contenthash].min.js',
      path: path.resolve(__dirname, 'dist')
    }
  },
  parts.htmlWebpackPlugin(),
  parts.loadImages({ limit: 15000 }),
  // { test: /\.svg$/, type: "asset" },
  parts.loadCSS(),
  parts.sassLoader(),
  parts.loadJavaScript(),
  parts.loadTypeScript(),
]);

const productionConfig = merge([
  parts.extractCSS(),
  parts.cleanWebpack(),
]);

const developmentConfig = merge([
  parts.devServer(),
  parts.urlLoader(),
]);

const getConfig = (mode) => {
  switch (mode) {
    case "production":
      return merge(commonConfig, productionConfig, { mode });
    case "development":
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = getConfig(mode);