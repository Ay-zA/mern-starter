import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import { pathes } from './configs';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development')
};

export default {
  devtool: '#eval-source-map',
  target: 'web',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=false',
    pathes.clientMain
  ],
  output: {
    path: pathes.build,
    publicPath: '/',
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].map'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new HtmlWebpackPlugin({
      template: pathes.index,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: pathes.resolveBuild('index.html'),
      inject: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].js',
      minChunks(mod) {
        const { context } = mod;
        return context && context.indexOf('node_modules') >= 0;
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true
    })
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: ['react-hot-loader/webpack', 'babel-loader'] },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff' } },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/octet-stream' } },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'image/svg+xml' } },
      { test: /\.(jpe?g|png|gif|ico)$/i, loader: 'file-loader', query: { limit: 10000, name: pathes.resolveBuild('assets/img/[name].[hash:7].[ext]') } },
      {
        test: /(\.css|\.scss|\.sass)$/,
        loaders: ['style-loader', 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: 'sass-loader',
            options: { includePaths: [pathes.sassIncludePath], sourceMap: true }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      pathes.app,
      pathes.appNodeModules
    ]
  }
};
