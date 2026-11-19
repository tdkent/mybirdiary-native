import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

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
