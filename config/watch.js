const webpack = require("webpack");
const chokidar = require("chokidar");
const path = require("path");

const clientConfig = require("./webpack.client");
const serverConfig = require("./webpack.server");
const { fork } = require("child_process");

webpack([clientConfig(true), serverConfig(true)]).watch({  }, (err, stats) => 
{
	if(err)
	{
		console.error(err);
	}
	else
	{
		console.log(stats.toString("minimal"));
	}
});

let serverProcess = null;

const kill = () => serverProcess && process.kill(serverProcess.pid);

const runServer = () =>
{
	kill();
	
	try
	{
		serverProcess = fork(path.resolve(__dirname, "../dist/main.bundle.js"), { cwd: path.resolve(__dirname, "../dist"), stdio: "inherit" });
	}
	catch(e)
	{
		console.log("ERROR!");
	}
}

chokidar.watch(path.resolve(__dirname, "../dist")).on('all', (e, p) =>
{
	runServer();
});