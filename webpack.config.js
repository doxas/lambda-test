const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    handler: path.resolve(__dirname, 'handler.js')
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '.webpack/'),
    filename: '[name].js'
  }
};
