import { useAuth } from "@/hooks/useAuth";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

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
