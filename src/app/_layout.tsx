import RootNavigator from "@/components/navigators/RootNavigator";
import SplashScreenController from "@/components/ui/splash-screen-controller";
import { AuthProvider } from "@/context/AuthContext";
import { Uniwind } from "uniwind";
import "../global.css";

Uniwind.setTheme("system");

export default function RootLayout() {
	return (
		<AuthProvider>
			<SplashScreenController />
			<RootNavigator />
		</AuthProvider>
	);
}
