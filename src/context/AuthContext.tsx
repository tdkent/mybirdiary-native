import { account } from "@/lib/appwrite";
import type { UserAuth } from "@/types/auth";
import { createContext, useEffect, useState } from "react";
import { ID } from "react-native-appwrite";

interface Auth {
	isLoggedIn: boolean;
	isLoading: boolean;
	login: () => void;
	logout: () => void;
	register: (values: UserAuth) => void;
}

export const AuthContext = createContext<Auth>({
	isLoggedIn: false,
	isLoading: false,
	login: () => {},
	logout: () => {},
	register: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	async function register(values: UserAuth) {
		try {
			await account.create({
				userId: ID.unique(),
				email: values.email,
				password: values.password,
			});

			setIsLoggedIn(true);
		} catch (e) {
			console.error(e);
		}
	}

	function login() {}

	function logout() {}

	/* Check user's auth status on first mount. */
	useEffect(() => {
		async function checkAuthStatus() {
			setIsLoading(true);
			try {
				await account.get();
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
