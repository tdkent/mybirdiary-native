import { account } from "@/lib/appwrite";
import { createContext, useEffect, useState } from "react";

interface Auth {
	isLoggedIn: boolean;
	isLoading: boolean;
	login: () => void;
	logout: () => void;
}

export const AuthContext = createContext<Auth>({
	isLoggedIn: false,
	isLoading: false,
	login: () => {},
	logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
