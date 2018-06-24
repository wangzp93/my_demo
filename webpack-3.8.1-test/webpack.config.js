module.exports = {
	entry: "./src/js/main.js",	//webpack命令 第一个参数
	output: {
		path: __dirname + "/dist",
		filename: "build.js"		//webpack命令 第二个参数
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"	//当为css文件时，调用这个加载器
			}
		]
	},
	devServer: {
		port: 8086
	}
};
