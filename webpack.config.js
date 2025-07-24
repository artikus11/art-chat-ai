const path = require( 'path' );
const glob = require( 'glob' );
const fs = require( 'fs' );
const defaultConfig = require( "@wordpress/scripts/config/webpack.config" );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require( "css-minimizer-webpack-plugin" );
const { hasBabelConfig } = require( '@wordpress/scripts/utils' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const SpriteLoaderPlugin = require( 'svg-sprite-loader/plugin' );

const UnminifiedWebpackPlugin = require( 'unminified-webpack-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

const BUILD_DIR = path.resolve( __dirname, 'assets' );

const filename = ext => isProduction ? ext + '/[name].min.' + ext : ext + '/[name].min.' + ext;

const svgFiles = glob.sync( path.resolve( __dirname, 'src/icons/*.svg' ) );
const spriteSvgEntry = svgFiles.length > 0 ? svgFiles : undefined;


class RemoveSvgSpriteJsPlugin {
	apply( compiler ) {
		compiler.hooks.afterEmit.tap( 'RemoveSvgSpriteJsPlugin', () => {

			const filesToRemove = glob.sync( path.join( BUILD_DIR, 'js/sprite-svg*' ) );

			filesToRemove.forEach( filePath => {
				if ( fs.existsSync( filePath ) ) {
					fs.unlinkSync( filePath );
					console.log( `→ Removed ${ path.basename( filePath ) }` );
				}
			} );
		} );
	}
}


const getBlockEntries = () => {
	const entries = {};

	// SCSS блоки
	const scssBlockFiles = glob.sync( path.resolve( process.cwd(), 'src/scss/blocks', '*.scss' ) );
	scssBlockFiles.forEach( filePath => {
		const name = path.basename( filePath, '.scss' );
		entries[ `blocks/${ name }-style` ] = filePath; // Добавляем суффикс -style
	} );

	// JS блоки
	const jsBlockFiles = glob.sync( path.resolve( process.cwd(), 'src/js/blocks', '*.js' ) );
	jsBlockFiles.forEach( filePath => {
		const name = path.basename( filePath, '.js' );
		entries[ `blocks/${ name }-script` ] = filePath; // Добавляем суффикс -script
	} );

	return entries;
};

module.exports = {
	...defaultConfig,
	mode,
	devtool: ! isProduction ? 'source-map' : false,
	//devtool:      ! isProduction ? false : false,
	entry: {
		"public-script":  path.resolve( process.cwd(), 'src/js', 'public-script.js' ),
	},
	output: {
		filename: filename( 'js' ),
		path: BUILD_DIR,
		clean: true,
		chunkFilename: '[name].js'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false, // Отключаем дефолтное разделение
				vendors: false, // Отключаем разделение vendor-кода
			},
		},
		runtimeChunk: false, // Отключаем runtime-чанк
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin( {
				minimizerOptions: {
					preset: [
						"default",
						{ "discardComments": { "removeAll": true } }
					]
				},
			} ),
			new TerserPlugin( {
				extractComments: false,
				terserOptions: {
					format: {
						comments: false,
					},
				},
				exclude: /sprite-svg\.js/,
			} ),
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					require.resolve( 'babel-loader' ),
					{
						loader: require.resolve( 'babel-loader' ),
						options: {
							cacheDirectory: process.env.BABEL_CACHE_DIRECTORY || true,
							presets: [
								require.resolve( '@wordpress/babel-preset-default' ),
								require.resolve( '@babel/preset-env' ),
							],
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: [ "style-loader", "css-loader" ],
			},
			{
				test: /\.s[ac]ss$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: ! isProduction,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: ! isProduction,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: ! isProduction,
							implementation: require( 'sass' ),
							sassOptions: {
								includePaths: [
									path.resolve(__dirname, 'node_modules'),
								],
							},
						},
					},
				],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
				include: path.resolve( __dirname, 'src/images' ),
				exclude: [
					path.resolve( __dirname, 'src/icons' ),
					path.resolve( __dirname, 'src/fonts' )
				],
				type: 'asset/resource',
				generator: {
					filename: "images/[name][ext]",
				},
			},
			{
				test: /\.svg$/,
				include: path.resolve( __dirname, 'src/icons' ),
				exclude: [
					path.resolve( __dirname, 'src/images' ),
					path.resolve( __dirname, 'src/fonts' )
				],
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							extract: true,
							spriteFilename: 'images/icons.svg',
							symbolId: filePath => 'icon-' + path.basename( filePath, '.svg' ).toLowerCase(),
							esModule: false,
						}
					},
					'svgo-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
				include: path.resolve( __dirname, 'src/fonts' ),
				exclude: [
					path.resolve( __dirname, 'src/icons' ),
					path.resolve( __dirname, 'src/images' )
				],
				type: 'asset/resource',
				generator: {
					filename: "fonts/[name][ext]",
				},
			},
		],
	},
	plugins: [
		new RemoveEmptyScriptsPlugin(),
		new MiniCssExtractPlugin( {
			filename: filename( 'css' ),
		} ),
		new SpriteLoaderPlugin( {
			plainSprite: true,
		} ),
		new UnminifiedWebpackPlugin( {
			exclude: [ /sprite-svg/ ],
		} ),
		new RemoveSvgSpriteJsPlugin(),
	],

	externals: {
		jquery: 'jQuery'
	}
}
