import { Async } from "@lib/Async";
import React, { useContext } from "react";

export class AppContext
{
	private static readonly Type = React.createContext<null | AppContext>(null);

	public static readonly use = () =>
	{
		const ctx = useContext(AppContext.Type);
		if (!ctx)
			throw new Error("AppContext is not provided! Check the root of the app.");
		return ctx;
	}

	public static readonly Provider = ({ context, children }: React.PropsWithChildren<{ context: AppContext }>) =>
	{
		const ctx = useContext(AppContext.Type);
		if (!ctx)
			return React.createElement(AppContext.Type.Provider, { value: context }, children);
		return React.createElement(React.Fragment, {}, children);
	}

	private toResolve: {
		[id: string]: {
			resolver: Async.Resolver<any, any>,
			props: any,
			component: React.FC<Async.Data<any> & any>;
			contexts: { [type: string]: any; };
		};
	} = {};

	public asyncData: { [id: string]: Async.Data<any> } = {};

	public contextStack: { [type: string]: any[]; } = {};

	public constructor()
	{

	}

	public resolvePending = () =>
	{
		const promises =  this.toResolve.ma;

		console.log(JSON.stringify(this.toResolve));
	}

	public readonly resolve = <P extends {}, T>(id: string, resolver: Async.Resolver<P, T>, props: P, component: React.FC<Async.Data<T> & P>) => 
	{
		const contexts: { [type: string]: any; } = {};

		for (const k in this.contextStack)
			contexts[k] = this.contextStack[k][this.contextStack[k].length - 1];
		
		this.toResolve[id] = { resolver, props, component, contexts };
	}
}