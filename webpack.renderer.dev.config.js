const path = require("path")
const { spawn } = require("child_process")
const webpack = require("webpack")
const merge = require("webpack-merge")

const baseConfig = require("./webpack.renderer.config")

module.exports = merge.smart(baseConfig, {
  entry: ["./src/renderer.tsx"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "src", "main.ts")],
        use: [
          "awesome-typescript-loader",
          {
            loader: "babel-loader",
            options: {
              plugins: [
                "@babel/plugin-syntax-typescript",
                "@babel/plugin-syntax-decorators",
                "@babel/plugin-syntax-jsx",
                "react-hot-loader/babel",
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
  devServer: {
    port: 2500,
    compress: true,
    stats: "errors-only",
    inline: true,
    hot: true,
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    before() {
      if (process.env.START_HOT) {
        console.log("Starting MAIN Process...")
        spawn("npm", ["run", "dev-main"], { shell: true, env: process.env, stdio: "inherit" })
          .on("close", process.exit)
          .on("error", console.error)
      }
    },
  },
})
