const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { mdsvex } = require('mdsvex')
const appConfig = require('./app.config')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

module.exports = {
  entry: {
    bundle: ['./main.js'],
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte', '.svx'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: appConfig.basePath || '/',
  },
  module: {
    rules: [
      {
        test: /\.(svelte|svx)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            dev: !prod,
            hydratable: false,
            hotReload: true,
            preprocess: mdsvex({
              layout: {
                _: './pages/_mdx.svelte',
              },
              remarkPlugins: [require('reading-time'), require('remark-autolink-headings')],
            }),
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devtool: prod ? false : 'source-map',
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: 'index.html',
    },
  },
}
