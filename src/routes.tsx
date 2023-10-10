import { Routes as AppRoutes, Route } from "react-router-dom";
import { Todo } from "./pages/Todo";

export default function Routes() {
	return (
		<AppRoutes>
			<Route path="/" element={<Todo />} />
		</AppRoutes>
	);
}
