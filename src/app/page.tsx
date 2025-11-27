"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
	const tasks = useQuery(api.events.get);
	return (
		<div>
			{tasks?.map((task) => (
				<div key={task._id}>{task.name}</div>
			))}
		</div>
	);
}
