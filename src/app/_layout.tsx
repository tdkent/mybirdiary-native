import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Uniwind } from "uniwind";
import { AuthProvider } from "@/context/AuthContext";
import { delay } from "@/utils/delay";
import "../global.css";

Uniwind.setTheme("system");

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		async function checkAuth() {
			try {
				await delay(0);
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
		<AuthProvider>
			<RootNavigator />
		</AuthProvider>
	);
}

function RootNavigator() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Home Page",
				}}
			/>
			<Stack.Screen
				name="(app)"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
