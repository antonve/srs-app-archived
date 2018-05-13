import * as path from 'path'
import { Configuration } from 'webpack'

const config: Configuration = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  devtool: 'source-map',
  plugins: [],
}

export default config // tslint:disable-line
