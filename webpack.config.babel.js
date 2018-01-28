var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

const config = require('./src/constants/config');

const ENV = process.env.NODE_ENV || 'development';
const sourcePath = path.join(__dirname, './');
const { PORT } = config;

var _module = {
  rules: [
    {
      test: /\.(ico|jpg|jpeg|png|gif|eot|ttf|woff|svg|less)/,
      loader: 'file-loader'
    }, {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'babel-preset-stage-3']
      }
    }, {
      test: /\.(scss|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      })
    }
  ],
};

var resolve = {
  extensions: [
    '*', '.scss', '.js', '.json'
  ],
  modules: [
    path.resolve(__dirname, './node_modules'), 'node_modules'
  ],
  alias: {
    'base': path.resolve(__dirname, './src/'),
    'components': path.resolve(__dirname, './src/components/'),
    'assets': path.resolve(__dirname, './src/assets/'),
    'global_styles': path.resolve(__dirname, './src/assets/styles/'),
    'constants': path.resolve(__dirname, './src/constants'),
    'app': path.resolve(__dirname, './src/components/app'),
    'pages': path.resolve(__dirname, './src/components/pages'),
    'layout': path.resolve(__dirname, './src/components/layout'),
    'modules': path.resolve(__dirname, './src/components/modules'),
    'build': path.resolve(__dirname, './build'),
    'partials': path.resolve(__dirname, './src/components/modules/partials'),
    'jquery': path.resolve(__dirname, 'node_modules') + '/jquery/src/jquery.js',
  }
};

var plugins = ([
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: ENV,
    options: {
      context: __dirname
    }
  }),
  new ExtractTextPlugin({
    filename: 'style.[hash].css',
    disable: false,
    allChunks: true
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
]);

module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = ENV === 'production';

  const envars = {
    NODE_ENV: JSON.stringify(ENV),
    PORT: JSON.stringify(PORT)
  };

  const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: isProd ? 'style.[hash].css' : 'style.css',
      disable: false,
      allChunks: true
    }),
    new webpack.EnvironmentPlugin(envars),
    new webpack.DefinePlugin({
      'process.env': envars
    }),
    new webpack.NamedModulesPlugin(),
    new ManifestPlugin()
  ];

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      })
    );
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.LoaderOptionsPlugin({
        debug: true,
        options: {
          context: __dirname
        }
      }),
    );
  }

  const devtool = isProd ? 'source-map' : 'eval';

  return [
    {
      devtool: devtool,
      context: sourcePath,
      name: "browser",
      entry: {
        app: [
          'babel-polyfill',
          'jquery',
          './src/index.js',
          'bootstrap/dist/css/bootstrap.css',
          'global_styles/_main.scss'
        ],
      },
      output: {
        path: path.join(__dirname, 'build'),
        filename: isProd ? 'bundle.[hash].js' : 'bundle.js',
        publicPath: '/'
      },
      module: _module,
      plugins: plugins.concat(
        new HtmlWebpackPlugin({
          template: path.resolve('./src/', 'index.html'),
          favicon: path.resolve('./src/', 'assets/images/favicon.ico'),
          minify: {
            collapseWhitespace: true
          }
        })
      ),
      performance: isProd && {
        hints: 'warning'
      },
      stats: {
        colors: {
          green: '\u001b[32m'
        }
      },
      node: {
        fs: 'empty',
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: false
      },
      resolve: resolve,
      devServer: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000,
        contentBase: './',
        historyApiFallback: true
      }
    },
    {
      devtool: devtool,
      context: sourcePath,
      name: "server-side rendering",
      entry: {
        app: [
          'babel-polyfill',
          'global_styles/_main.scss',
          './src/server.js'
        ],
      },
      target: "node",
      output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.server.js',
        publicPath: '/',
        libraryTarget: "commonjs-module"
      },
      module: _module,
      plugins: plugins.concat([
        new webpack.NormalModuleReplacementPlugin(
          /node_modules\/axios\/lib\/adapters\/xhr\.js/,
          'http.js'
        )
      ]),
      performance: isProd && {
        hints: 'warning'
      },
      stats: {
        colors: {
          green: '\u001b[32m'
        }
      },
      resolve: resolve
    }
  ];
}
