
import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const port = process.env.DEV_PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';
const PROJECT_PATH = __dirname;
const inProject = (...args) => resolve(PROJECT_PATH, ...args);
const inClient = inProject.bind(null, 'src/client');
const clientDir = inClient();
const sharedDir = inProject('src/shared');

export default () => {
	const config = {
		devtool: isDev ? 'source-map' : 'none',
		entry: {
			app: [
				'babel-polyfill',
				isDev && 'react-hot-loader/patch',
				`./src/client/boot.${isDev ? 'dev' : 'prod'}.js`,
			].filter(Boolean),
		},
		output: {
			filename: 'bundle.[hash:7].js',
			path: resolve(__dirname, 'lib/static'),
			publicPath: '/',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: [clientDir, sharedDir],
					loader: 'babel-loader',
					options: {
						plugins: [
							isDev && 'react-hot-loader/babel',
						].filter(Boolean),
						forceEnv: 'webpack',
					},
				},
				{
					test: /\.css$/,
					include: clientDir,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								sourceMap: isDev,
								module: true,
								localIdentName: isDev ?
									'[path]-[name]-[local]-[hash:base64:3]' : '[hash:base64:7]'
								,
							},
						}
					],
				},
				{
					test: /\.css$/,
					include: /node_modules/,
					use: [
						'style-loader',
						'css-loader',
					],
				},
				{
					test: /\.scss$/,
					include: clientDir,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								sourceMap: isDev,
								module: true,
								localIdentName: isDev ?
									'[path]-[name]-[local]-[hash:base64:3]' : '[hash:base64:7]'
								,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								includePaths: [inClient('styles')],
							},
						},
					],
				},
				{
					test: /\.less$/,
					include: /node_modules/,
					use: [
						'style-loader',
						'css-loader',
						'less-loader',
					],
				},
			],
		},
		plugins: [
			isDev && new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
				__DEV__: isDev,
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: inClient('index.html'),
				minify: {
					collapseWhitespace: true,
					minifyJS: true,
				},
			}),
		].filter(Boolean),
		resolve: {
			modules: [clientDir, sharedDir, 'node_modules'],
			extensions: ['.js'],
		},
		resolveLoader: {
			moduleExtensions: ['-loader'],
		},
		devServer: {
			port,
			contentBase: 'client',
			hot: true,
			stats: {
				chunkModules: false,
				colors: true,
			},
			historyApiFallback: {
				disableDotRule: true,
			},
			disableHostCheck: true,
		},
	};

	if (!isDev) {
		config.module.rules
			.filter(({ test }) =>
				['.less', '.scss', '.css'].some((ext) => test.test(ext))
			)
			.forEach((rule) => {
				const [, ...use] = rule.use;
				rule.use = ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use,
				});
			})
		;

		config.plugins.push(
			new ExtractTextPlugin('style.[hash:7].css')
		);
	}

	return config;
};
