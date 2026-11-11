import RootNavigator from "@/components/navigators/RootNavigator";
import SplashScreenController from "@/components/ui/Splash";
import { AuthProvider } from "@/context/AuthContext";
import { queryClient } from "@/lib/tanstack-query";
import { useTanStackQueryDevTools } from "@rozenite/tanstack-query-plugin";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { Uniwind } from "uniwind";
import "../global.css";
import "../lib/query-lifecycle";

Uniwind.setTheme("system");

export default function RootLayout() {
	useTanStackQueryDevTools(queryClient);

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
