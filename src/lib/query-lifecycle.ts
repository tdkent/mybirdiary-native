import { focusManager, onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";
import { AppState, Platform } from "react-native";

/** Notify TS Query when connectivity changes. */
onlineManager.setEventListener((setOnline) => {
	let initialized = false;

	const eventSubscription = Network.addNetworkStateListener((state) => {
		initialized = true;
		setOnline(!!state.isConnected);
	});

	Network.getNetworkStateAsync()
		.then((state) => {
			if (!initialized) {
				setOnline(!!state.isConnected);
			}
		})
		.catch(() => {});

	return eventSubscription.remove;
});

/** Notify TS Query when app is refocused. */
AppState.addEventListener("change", (status) => {
	if (Platform.OS !== "web") {
		focusManager.setFocused(status === "active");
	}
});
