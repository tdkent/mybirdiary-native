import RootNavigator from "@/components/navigators/RootNavigator";
import SplashScreenController from "@/components/ui/Splash";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { Uniwind } from "uniwind";
import "../global.css";

Uniwind.setTheme("system");

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<StatusBar style="auto" />
				<SplashScreenController />
				<RootNavigator />
			</AuthProvider>
		</QueryClientProvider>
	);
}
