import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

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
