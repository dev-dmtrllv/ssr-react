const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (dev = false) =>
{
	return {
		stats: "minimal",
		mode: dev ? "development" : "production",
		entry: path.resolve(__dirname, "../src/app/index.tsx"),
		devtool: "inline-source-map",
		output: {
			filename: "js/[name].bundle.js",
			chunkFilename: "js/[id].chunk.js",
			path: path.resolve(__dirname, "../dist/public"),
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader",
					],
				},
				{
					test: /\.(jpe?g|png|gif|svg|ico|webp)$/i,
					use: {
						loader: "url-loader",
						options: {
							fallback: "file-loader",
							limit: 40000,
							name: "img/[name].[ext]",
						},
					},
				}
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: `css/[name].bundle.css`,
				chunkFilename: `css/[id].chunk.css`,
				ignoreOrder: false
			}),
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, "../public"),
						to: path.resolve(__dirname, "../dist/public"),
						globOptions: {
							ignore: [
								'**/index.html'
							]
						}
					}
				],
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "../public/index.html"),
				filename: path.resolve(__dirname, "../dist/public/index.html")
			})
		],
		resolve: {
			extensions: [".tsx", ".ts", ".jsx", ".js"],
			plugins: [
				new TsconfigPathsPlugin({})
			]
		},
		optimization: {
			runtimeChunk: "single",
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all"
					}
				}
			}
		},
		experiments: {
			topLevelAwait: true,
		}
	};
}