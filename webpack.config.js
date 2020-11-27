const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");

const commonConfig = merge([
  { entry: ["./src"] },
  parts.cleanWebpack(),
  parts.page({ title: "Demo" }),
  parts.loadImages({ limit: 15000 }),
  { test: /\.svg$/, type: "asset" },
  {
    test: /\.svg$/,
    use: ['@svgr/webpack'], //svgr loader for svg as component
  },
  {
    test: /\.(ttf|eot|woff|woff2)$/,
    type: "asset/resource",
  },
  parts.loadCSS(),
  parts.extractCSS(),
  parts.sassLoader(),
  parts.loadJavaScript(),
  parts.loadTypeScript(),
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  { entry: ["webpack-plugin-serve/client"] },
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