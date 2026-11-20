import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/use-auth";

export default function Index() {
	const { isAuthChecked, isLoggedIn } = useAuth();

	if (!isAuthChecked) {
		return null;
	}

	return (
		<Redirect
			href={isLoggedIn ? "/(app)/(tabs)/new-sighting" : "/(auth)/login"}
		/>
	);
}
