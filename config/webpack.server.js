const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = (dev = false) =>
{
	return {
		stats: "minimal",
		mode: dev ? "development" : "production",
		entry: path.resolve(__dirname, "../src/server/index.ts"),
		devtool: "inline-source-map",
		target: "node",
		output: {
			filename: "[name].bundle.js",
			chunkFilename: "[id].chunk.js",
			path: path.resolve(__dirname, "../dist"),
		},
		externals: [nodeExternals()],
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
						"ignore-loader"
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
		resolve: {
			extensions: [".tsx", ".ts", ".jsx", ".js"],
			plugins: [
				new TsconfigPathsPlugin({})
			]
		},
		experiments: {
			topLevelAwait: true,
		}
	};
}