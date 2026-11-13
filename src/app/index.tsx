import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";

export default function Index() {
	const { isAuthChecked, isLoggedIn } = useAuth();

	if (!isAuthChecked) {
		return null;
	}

	return (
		<Redirect href={isLoggedIn ? "/(app)/new-sighting" : "/(auth)/login"} />
	);
}
