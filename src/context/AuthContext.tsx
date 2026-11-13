import { account } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/error-messages";
import type { UserAuth } from "@/types/forms";
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useEffect,
	useState,
} from "react";
import { ID } from "react-native-appwrite";

interface Auth {
	error: string | null;
	isAuthChecked: boolean;
	isLoading: boolean;
	isLoggedIn: boolean;
	login: (values: UserAuth) => void;
	logout: () => void;
	register: (values: UserAuth) => void;
	setError: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<Auth>({
	error: null,
	isAuthChecked: false,
	isLoading: false,
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
	register: () => {},
	setError: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [error, setError] = useState<string | null>(null);
	const [isAuthChecked, setIsAuthChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	async function register({ email, password }: UserAuth) {
		setError(null);
		setIsLoading(true);
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
			setError(getErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	}

	async function login({ email, password }: UserAuth) {
		setError(null);
		setIsLoading(true);
		try {
			await account.createEmailPasswordSession({
				email,
				password,
			});

			setIsLoggedIn(true);
		} catch (e) {
			setError(getErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	}

	async function logout() {
		setIsLoading(true);
		try {
			await account.deleteSession({ sessionId: "current" });
			setIsLoggedIn(false);
		} catch (e) {
			setError(getErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	}

	/* Check user's auth status on first mount. */
	useEffect(() => {
		async function checkAuthStatus() {
			setIsAuthChecked(true);
			try {
				const user = await account.get();
				if (user) setIsLoggedIn(true);
			} catch {
				return null;
			} finally {
				setIsAuthChecked(false);
			}
		}

		checkAuthStatus();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				error,
				isAuthChecked,
				isLoading,
				isLoggedIn,
				login,
				logout,
				register,
				setError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
