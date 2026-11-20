import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

/** Controls how the Splash screen renders. */
export default function SplashScreenController() {
	const { isAuthChecked } = useAuth();

	useEffect(() => {
		if (isAuthChecked) {
			SplashScreen.hide();
		}
	}, [isAuthChecked]);

	return null;
}
