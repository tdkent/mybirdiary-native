import { useAuth } from "@/hooks/useAuth";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function SplashScreenController() {
	const { isAuthChecked } = useAuth();

	if (!isAuthChecked) {
		SplashScreen.hide();
	}

	return null;
}
