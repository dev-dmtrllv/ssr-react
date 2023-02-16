export namespace object
{
	export const each = <T extends {}>(o: T, callback: <K extends keyof T>(key: K, item: K) => void) =>
	{
		Object.keys(o).forEach((key) => callback(key, (o as any)[key]));
	}

	export const mapToArray = <T extends {}, R>(o: T, callback: <K extends keyof T>(key: K, item: K) => R): R[] =>
	{
		return Object.keys(o).map((key) => callback(key, (o as any)[key]));
	}

	export const map = <T extends {}, R>(o: T, callback: <K extends keyof T>(key: K, item: K) => void) =>
	{
		Object.keys(o).forEach((key) => callback(key, (o as any)[key]));
	}
}