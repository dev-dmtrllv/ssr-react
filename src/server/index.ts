import { App } from "@app/App";
import { Renderer } from "@lib/server";
import express from "express";

const app = express();

const appRenderer = new Renderer(App);

app.all("*", (req, res) => 
{
	res.send(appRenderer.render());
});

app.listen(1337, "127.0.0.1", () => 
{
	console.log(`server listening on http://127.0.0.1:1337`);
});