import RootNavigator from "@/components/navigators/RootNavigator";
import SplashScreenController from "@/components/ui/Splash";
import { AuthProvider } from "@/context/AuthContext";
import { useTanStackQueryDevTools } from "@rozenite/tanstack-query-plugin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { Uniwind } from "uniwind";
import "../global.css";

Uniwind.setTheme("system");

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 60 * 24, // 1d
		},
	},
});

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
