import { createContext, useEffect, useState } from "react";

interface Auth {
	hasSession: boolean;
	login: () => void;
	logout: () => void;
}

export const AuthContext = createContext<Auth>({
	hasSession: false,
	login: () => {},
	logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [hasSession, setHasSession] = useState(true);

	function login() {}

	function logout() {}

	useEffect(() => {
		setHasSession(true);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				hasSession,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
