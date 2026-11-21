import { useQueryClient } from "@tanstack/react-query";
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useEffect,
	useState,
} from "react";
import { ID, type Models } from "react-native-appwrite";
import { account } from "@/lib/appwrite";
import { createSession } from "@/services/api/auth";
import { getErrorMessage } from "@/services/errors/get-error-message";
import type { UserAuthInputs } from "@/types/forms";

export interface Auth {
	error: string | null;
	isAuthChecked: boolean;
	isLoading: boolean;
	login: (values: UserAuthInputs) => void;
	logout: () => void;
	register: (values: UserAuthInputs) => void;
	setError: Dispatch<SetStateAction<string | null>>;
	user: Models.User<Models.Preferences> | null;
}

export const AuthContext = createContext<Auth | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [error, setError] = useState<string | null>(null);
	const [isAuthChecked, setIsAuthChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
		null,
	);

	const queryClient = useQueryClient();

	async function register(values: UserAuthInputs) {
		setError(null);
		setIsLoading(true);
		try {
			await account.create({
				userId: ID.unique(),
				...values,
			});

			const user = await createSession(values);
			setUser(user);

			// clear cache here in case previous session was not ended by logout()
			queryClient.clear();
		} catch (e) {
			setError(getErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	}

	async function login(values: UserAuthInputs) {
		setError(null);
		setIsLoading(true);
		try {
			const user = await createSession(values);
			setUser(user);

			// clear cache here in case previous session was not ended by logout()
			queryClient.clear();
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
			setUser(null);

			// clear query cache
			queryClient.clear();
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
				if (user) setUser(user);
			} catch {
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
