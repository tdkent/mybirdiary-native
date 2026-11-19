import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useEffect,
	useState,
} from "react";
import { ID, type Models } from "react-native-appwrite";
import { account } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/error-messages";
import type { UserAuthInputs } from "@/types/forms";

export interface Auth {
	error: string | null;
	isAuthChecked: boolean;
	isLoading: boolean;
	isLoggedIn: boolean;
	login: (values: UserAuthInputs) => void;
	logout: () => void;
	register: (values: UserAuthInputs) => void;
	setError: Dispatch<SetStateAction<string | null>>;
	user: Models.User | null;
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
	user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [error, setError] = useState<string | null>(null);
	const [isAuthChecked, setIsAuthChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState<Models.User | null>(null);

	async function register({ email, password }: UserAuthInputs) {
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

			const user = await account.get();

			setIsLoggedIn(true);
			setUser(user);
		} catch (e) {
			setError(getErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	}

	async function login({ email, password }: UserAuthInputs) {
		setError(null);
		setIsLoading(true);
		try {
			await account.createEmailPasswordSession({
				email,
				password,
			});

			const user = await account.get();

			setIsLoggedIn(true);
			setUser(user);
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
			setUser(null);
		} catch (e) {
			setError(getErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	}

	/* Check user's auth status on first mount. */
	useEffect(() => {
		async function checkAuthStatus() {
			setIsAuthChecked(false);
			try {
				const user = await account.get();
				if (user) {
					setIsLoggedIn(true);
					setUser(user);
				}
			} catch {
				return null;
			} finally {
				setIsAuthChecked(true);
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
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
