import { AppContext } from "@lib/AppContext";
import React from "react";
import ReactDOMServer from "react-dom/server";

export class Renderer<Component extends React.FC<P>, P extends {}>
{
	private readonly component: Component;

	public constructor(component: Component)
	{
		this.component = component;
	}

	public readonly render: RenderFunc<P> = (props?: P) =>
	{
		const ctx = new AppContext();
		const str = ReactDOMServer.renderToString(<AppContext.Provider context={ctx}><this.component {...(props || {}) as any} /></AppContext.Provider>);
		
		ctx.resolvePending()
		return str;
	}
}

type RenderFunc<P extends {}> = keyof P extends never ? () => string : (props: P) => string;