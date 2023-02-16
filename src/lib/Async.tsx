import { AppContext } from "@lib/AppContext";
import { string } from "@utils/string";
import React from "react";

export namespace Async
{
	export const create = <P extends {}, T>(resolver: Resolver<P, T>, component: React.FC<Data<T> & P>): FC<P & Props> =>
	{
		const asyncID = string.hash(resolver.toString());

		return (props) => 
		{
			const ID = `${asyncID}.${string.hash(JSON.stringify(props))}`;

			const ctx = AppContext.use();

			if (!ctx.asyncData[ID])
			{
				ctx.resolve(ID, resolver, props, component);
				return React.createElement(component, { ...props as any, isLoading: true, data: null, error: null, isAborted: false });
			}

			return React.createElement(component, { ...props as any, ...ctx.asyncData[ID] });
		};
	}

	export type Resolver<P extends {}, T> = (props: P) => Promise<T>;

	export type Props = {
		prefetch?: boolean;
	};

	export type Data<T> = {
		data: T;
		error: Error;
		isLoading: boolean;
		isAborted: boolean;
	};

	export type FC<P extends {}> = React.FC<P>;
}
