const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const APP_SOURCE = path.join(__dirname, "src");

exports.htmlWebpackPlugin = () => ({
  plugins: [new HtmlWebpackPlugin(
    {
      title: "Boilerplate",
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
    }
  )]
})

exports.loadTypeScript = () => ({
  devtool: 'inline-source-map',
	entry: './src/scripts/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    }
});

exports.loadJavaScript = () => ({
  module: {
    rules: [
      // Consider extracting include as a parameter
      { test: /\.js$/, include: APP_SOURCE, use: "babel-loader" },
    ],
  },
});
exports.urlLoader = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  }
});

exports.devServer = () => ({
  watch: true,
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: process.env.PORT || 8080,
    // port: 8080,
    // allowedHosts: ['localhost'],
    liveReload: true,
    open: {
      app: ['Google Chrome']
    }
  },
});

exports.svgrLoader = () => ({
  module: {
    rules:[{
      test: /\.svg$/,
      use: ['@svgr/webpack'], //svgr loader for svg as component
    }]
  }
});
exports.fontsLoader = () => ({
  module: {
    rules:[{
      test: /\.(ttf|eot|woff|woff2)$/,
      type: "asset/resource",
    }],
  }
});

exports.loadCSS = () => ({
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
});
exports.sassLoader = () => ({
  module: {
    rules: [
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
      },
    ],
  },
});
exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options },
            "css-loader",
          ].concat(loaders),
          sideEffects: true,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
  };
};
exports.cleanWebpack = () => ({plugins: [new CleanWebpackPlugin()]});

exports.loadImages = ({ limit } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: limit } },
      },
    ],
  },
});