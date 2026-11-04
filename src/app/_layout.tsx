import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Uniwind } from "uniwind";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { delay } from "@/utils/delay";
import "../global.css";

Uniwind.setTheme("system");
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<AuthProvider>
			<RootNavigator />
		</AuthProvider>
	);
}

function RootNavigator() {
	const { isLoggedIn } = useAuth();

	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		async function checkAuth() {
			try {
				await delay(2000);
			} catch (e) {
				console.warn(e);
			} finally {
				setIsReady(true);
			}
		}

		checkAuth();
	}, []);

	useEffect(() => {
		if (isReady) {
			SplashScreen.hide();
		}
	}, [isReady]);

	if (!isReady) {
		return null;
	}

	return (
		<Stack>
			<Stack.Protected guard={!isLoggedIn}>
				<Stack.Screen
					name="index"
					options={{
						title: "Home Page",
					}}
				/>
			</Stack.Protected>
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen
					name="(app)"
					options={{
						title: "new-sighting",
						headerShown: false,
					}}
				/>
			</Stack.Protected>
		</Stack>
	);
}
