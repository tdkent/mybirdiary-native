import { createContext, useEffect, useState } from "react";

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
		setHasSession(true);
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
