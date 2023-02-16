import { AppContext } from "@lib/AppContext";
import { string } from "@utils/string";
import React from "react";

export namespace Context
{
	export type Type<T> = {
		_original: React.Context<T>;
		Provider: React.FC<React.PropsWithChildren<{ value: T }>>;
		Consumer: React.FC<{ children: (ctx: T) => React.ReactElement<any, any> | null }>
	};

	export const create = <T extends any>(id: string | number, defaultValue: T): Type<T> =>
	{
		const ID = string.hash(id + JSON.stringify(defaultValue));

		const ctx = React.createContext(defaultValue);

		return {
			_original: ctx,
			Consumer: (props) => props.children(React.useContext(ctx)),
			Provider: ({ value, children }) => 
			{
				const appContext = AppContext.use();

				if (!appContext.contextStack[ID])
					appContext.contextStack[ID] = [];

				appContext.contextStack[ID].push(value);

				return (
					<ctx.Provider value={value}>
						{children}
					</ctx.Provider>
				);
			}
		};
	}

	export const use = <T extends any>(context: Type<T>): T => React.useContext(context._original)
}