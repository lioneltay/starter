const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

const settings = env => {
  return {
    entry: {
      app: "./src/index.tsx",
      other: "./src/index.tsx",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      publicPath: "/",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    module: {
      rules: [
        {
          use: ["react-hot-loader/webpack", "awesome-typescript-loader"],
          test: /\.(t|j)sx?$/,
          exclude: path.resolve(__dirname, "node_modules"),
          include: path.resolve(__dirname, "src"),
        },
        {
          use: ["style-loader", "css-loader", "sass-loader"],
          test: /\.scss$/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html",
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: "vendor.js",
      }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      historyApiFallback: true,
      hot: true,
      // inline: true,
    },
    devtool: "inline-source-map",
  }
}

module.exports = settings
