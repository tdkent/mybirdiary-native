import { createContext, useEffect, useState } from "react";
import { AppwriteException } from "react-native-appwrite";
import { account } from "@/lib/appwrite";

interface Auth {
	hasSession: boolean;
	isLoading: boolean;
	login: () => void;
	logout: () => void;
}

export const AuthContext = createContext<Auth>({
	hasSession: false,
	isLoading: false,
	login: () => {},
	logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [hasSession, setHasSession] = useState(true);
	const [isLoading] = useState(false);

	function login() {}

	function logout() {}

	useEffect(() => {
		async function checkAuthStatus() {
			try {
				const user = await account.get();
				console.log("user", user);
			} catch (error) {
				if (error instanceof AppwriteException) {
					if (error.code === 401) {
						console.error("The user is not authenticated");
					} else {
						console.error("Unexpected Appwrite exception occurred:", error);
					}
				} else {
					console.error("An unexpected error occurred", error);
				}
				return null;
			}
		}

		checkAuthStatus();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				hasSession,
				isLoading,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
