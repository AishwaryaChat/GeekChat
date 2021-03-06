const path = require('path')

module.exports = {
  entry: ['./public/app.js'],
  output: {
    path: path.resolve('./public/build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
        test: /\.js?$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      { test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, loader: 'url-loader?limit=10000' },
      { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      Main: path.resolve('public/components/Main.js'),
      User: path.resolve('public/components/users/User.js'),
      DefaultChat: path.resolve('public/components/chat/DefaultChat.js'),
      Chat: path.resolve('public/components/chat/chatArea/Chat.js'),
      ChatNavbar: path.resolve('public/components/chat/chatArea/ChatNavbar/ChatNavbar.js'),
      ChatArea: path.resolve('public/components/chat/chatArea/ChatArea.js'),
      MessageBox: path.resolve('public/components/chat/chatArea/MessageBox.js'),
      Contacts: path.resolve('public/components/users/Contacts.js'),
      Navbar: path.resolve('public/components/users/navbar/Navbar.js'),
      Options: path.resolve('public/components/users/navbar/Options.js'),
      Search: path.resolve('public/components/users/Search.js'),
      Video: path.resolve('public/components/Video.js')
    },
    extensions: ['*', '.js', '.jsx']
  }
}
