const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const flexBugFixer = require('postcss-flexbugs-fixes');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: './index.html',
  inject: true,
});

module.exports = {
  entry: {
    app: './src/index.js',
  },
  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   options: {
      //     configFile: '.eslintrc',
      //     emitError: false,
      //   },
      // },
      {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]',
      },


      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                flexBugFixer,
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
          // Need to run the react preset first to strip flow annotations
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              plugins: ['transform-class-properties', 'transform-object-rest-spread'],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    htmlWebpackPlugin,
  ],
  resolve: {
    alias: {
      screenComponents: path.resolve('src/screenComponents'),
      assets: path.resolve('src/assets'),
      views: path.resolve('src/views'),
      reduxReducers: path.resolve('src/reduxReducers'),
      store: path.resolve('src/store'),
    },
  },
  devServer: {
    inline: true,
    port: 9080,
    historyApiFallback: {
      index: '/',
    },
  },
};
