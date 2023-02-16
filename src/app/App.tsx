import { AppContext } from "@lib/AppContext";
import { Async } from "@lib/Async";
import { Context } from "@lib/Context";

const TestContext = Context.create("TestContext", { test: 1 });

const TestA = Async.create<{ test?: number }, number>(async ({ test }) => test || 1, ({ data, isLoading }) => 
{
	const { test } = Context.use(TestContext);

	if(isLoading)
		return <h1>Loading</h1>;

	return (
		<h1>
			{data} - {test}
		</h1>
	);
});

const Test = () =>
{
	console.log("render Test");

	const { test } = Context.use(TestContext);

	console.log(AppContext.use().contextStack);

	return (
		<h1>
			{test}
		</h1>
	);
};

export const App = () =>
{
	return (
		<div>
			<TestContext.Provider value={{ test: 10 }}>
				<Test />
				<TestA test={123}/>
			</TestContext.Provider>
			<TestContext.Provider value={{ test: 20 }}>
				<Test />
				<TestA  test={1000}/>
				<TestContext.Provider value={{ test: 30 }}>
					<Test />
					<TestA  test={10000}/>
				</TestContext.Provider>
			</TestContext.Provider>
			App
		</div>
	);
}