const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WebpackMessages = require('webpack-messages')

module.exports = {
	entry: {
		'summer': ['./src/main.js']
	},
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		path: __dirname + '/public_html/assets/build/',
		filename: '[name].built.js'
	},
	resolve: {
		extensions: ['.js', '.ts', '.scss', '.css', '.vue'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			Styles: __dirname + '/src/styles/',
			Components: __dirname + '/src/components/',
			Modules: __dirname + '/src/modules/'
		}
	},
	module: {
		rules: [
			{
        test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader'
      },
			{
				test: [/\.js$/],
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env'
							]
						}
					}
				]
			},
			{
				test: [/\.styl$/],
				use: [
					'style-loader',
					'css-loader',
					'stylus-loader'
				]
			},
			{
				test: [/\.css$/],
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('autoprefixer')
								({
									'browsers': ['> 1%', 'last 2 versions']
								})
							]
						}
					}
				]
			},
			{
				test: [/\.scss$/],
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('autoprefixer')
								({
									'browsers': ['> 1%', 'last 2 versions']
								})
							]
						}
					},
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new WebpackMessages({
      name: 'client',
      logger: str => console.log(`>> ${str}`)
    })
  ]
}
