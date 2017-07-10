const path = require('path')

module.exports = {
  entry: ['./public/app.js'],
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
        test: /\.js?$/,
        exclude: /node_modules/
      }
    ]
  }
}
