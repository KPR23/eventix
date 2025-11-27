import { auth } from "@clerk/nextjs/server";

export default async function Home() {
	const { isAuthenticated } = await auth();

	// Protect the route by checking if the user is signed in
	if (!isAuthenticated) {
		return <div>Sign in to view this page</div>;
	}
	return <div>test</div>;
}
