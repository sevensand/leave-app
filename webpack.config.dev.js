import path from 'path'

export default {
  devtools: 'eval-source-map',
  mode: 'development',
  entry: path.join(__dirname, '/client/index.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  resolve: {
  extensions: ['.js', '.jsx']
},
  module: {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-3']
            }
        }
    ]
  }
}
