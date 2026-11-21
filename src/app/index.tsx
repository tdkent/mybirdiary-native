import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/use-auth";

export default function Index() {
	const { isAuthChecked, user } = useAuth();

	if (!isAuthChecked) {
		return null;
	}

	return (
		<Redirect href={user ? "/(app)/(tabs)/new-sighting" : "/(auth)/login"} />
	);
}
