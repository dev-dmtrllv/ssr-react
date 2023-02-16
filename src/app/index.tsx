import { App } from "@app/App";
import { AppContext } from "@lib/AppContext";
import ReactDOM from "react-dom/client";

const getRootElement = () =>
{
	let el = document.getElementById("root");
	if(!el)
	{
		el = document.createElement("div");
		el.id = "root";
		document.body.appendChild(el);
	}
	return el;
}

const rootEl = getRootElement();

ReactDOM.createRoot(rootEl).render(
	<AppContext.Provider context={new AppContext()}>
		<App />
	</AppContext.Provider>
);