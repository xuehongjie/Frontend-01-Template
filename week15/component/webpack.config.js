module.exports = {
  entry: './main.js',
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { pragma: 'create' }],
            ],
          },
        },
      },
      {
        test: /\.view/,
        use: {
          loader: require.resolve('./myloader.js'),
        },
      },
    ],
  },
};
