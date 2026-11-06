import { account } from "@/lib/appwrite";
import type { UserAuth } from "@/types/auth";
import { createContext, useEffect, useState } from "react";
import { AppwriteException, ID } from "react-native-appwrite";

interface Auth {
	error: string | null;
	isLoggedIn: boolean;
	isLoading: boolean;
	login: (values: UserAuth) => void;
	logout: () => void;
	register: (values: UserAuth) => void;
}

export const AuthContext = createContext<Auth>({
	error: null,
	isLoggedIn: false,
	isLoading: false,
	login: () => {},
	logout: () => {},
	register: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [error, setError] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	async function register({ email, password }: UserAuth) {
		try {
			await account.create({
				userId: ID.unique(),
				email,
				password,
			});

			await account.createEmailPasswordSession({
				email,
				password,
			});

			setIsLoggedIn(true);
		} catch (e) {
			if (e instanceof AppwriteException) {
				if (e.type === "general_argument_invalid") {
					setError("Email or password are invalid.");
				}
			} else {
				console.error(e);
			}
		}
	}

	async function login({ email, password }: UserAuth) {
		try {
			await account.createEmailPasswordSession({
				email,
				password,
			});

			setIsLoggedIn(true);
		} catch (e) {
			console.error(e);
		}
	}

	async function logout() {
		try {
			await account.deleteSession({ sessionId: "current" });
			setIsLoggedIn(false);
		} catch (e) {
			console.error(e);
		}
	}

	/* Check user's auth status on first mount. */
	useEffect(() => {
		async function checkAuthStatus() {
			setIsLoading(true);
			try {
				await account.get();
				setIsLoggedIn(true);
			} catch (error) {
				console.error(error);
				return null;
			} finally {
				setIsLoading(false);
			}
		}

		checkAuthStatus();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				error,
				isLoggedIn,
				isLoading,
				login,
				logout,
				register,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
