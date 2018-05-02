import * as path from 'path'
import { spawn } from 'child_process'
import * as webpack from 'webpack'
import * as merge from 'webpack-merge'

import baseConfig from './webpack.renderer.config'

const config = merge.smart(baseConfig, {
  entry: ['./src/renderer.tsx'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'src', 'main.ts')],
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              babelCore: '@babel/core',
              babelOptions: {
                babelrc: false,
                plugins: ['react-hot-loader/babel', 'transform-class-properties'],
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    namedModules: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    port: 2500,
    compress: true,
    stats: 'errors-only',
    inline: true,
    hot: true,
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    before() {
      if (process.env.START_HOT) {
        console.log('Starting MAIN Process...')
        spawn('npm', ['run', 'dev-main'], { shell: true, env: process.env, stdio: 'inherit' })
          .on('close', process.exit)
          .on('error', console.error)
      }
    },
  },
})

export default config // tslint:disable-line
