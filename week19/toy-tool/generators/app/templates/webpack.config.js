const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    minimize: false,
  },
  devServer: {
    open: true,
    compress: false,
    contentBase: './src', // 加不加都可以
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }]],
          },
        },
      },
    ],
  },
  plugins: [new htmlWebpackPlugin()],
};
