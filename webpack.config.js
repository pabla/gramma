const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  app: resolve(__dirname, 'app'),
  build: resolve(__dirname, 'build'),
};

let cssRules;
if (process.env.NODE_ENV === 'production') {
  cssRules = ExtractTextPlugin.extract({
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]__[hash:6]',
        },
      },
      'postcss-loader',
    ],
  });
} else {
  cssRules = [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[name]__[local]__[hash:6]',
      },
    },
    'postcss-loader',
  ];
}

const config = {
  context: paths.app,
  entry: [
    './index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: paths.build,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [
          paths.app,
        ],
      },
      {
        test: /\.css$/,
        use: cssRules,
        include: [
          paths.app,
        ],
      },
    ],
  },
  plugins: [],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new ExtractTextPlugin('bundle.css')
  );
} else {
  config.devtool = 'cheap-module-source-map';
  config.entry.unshift(
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
  );
  config.devServer = {
    hot: true,
    contentBase: paths.build,
    publicPath: '/',
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}

module.exports = config;
