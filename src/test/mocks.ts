import type { Models } from "react-native-appwrite";
import type { Auth } from "@/context/auth-context";
import {
	mockDetailsData,
	mockListData,
	USER_EMAIL,
	USER_ID,
} from "@/test/fixtures";
import type {
	DetailsQueryReturnValue,
	ListQueryReturnValue,
} from "@/test/types";

// Appwrite
export const mockAppwriteUser: Models.User<Models.Preferences> = {
	$id: USER_ID,
	$createdAt: "2026-10-01T00:00:00.000+00:00",
	$updatedAt: "2026-11-01T00:00:00.000+00:00",
	registration: "2026-10-01T00:00:00.000+00:00",
	accessedAt: "2026-11-21T00:00:00.000+00:00",
	name: "",
	status: true,
	labels: [],
	passwordUpdate: "",
	email: USER_EMAIL,
	phone: "",
	emailVerification: false,
	phoneVerification: false,
	mfa: false,
	targets: [],
	prefs: {},
};

/** Auth context */
export const mockDefaultAuthContext: Auth = {
	authError: null,
	logoutError: null,
	isAuthChecked: false,
	isLoading: false,
	login: () => {},
	logout: () => {},
	register: () => {},
	setAuthError: () => {},
	user: null,
};

/** List component */
export const defaultListReturnValue: ListQueryReturnValue = {
	data: mockListData,
	error: null,
	isError: false,
	isPending: false,
};

/** Details component */
export const defaultDetailsReturnValue: DetailsQueryReturnValue = {
	data: mockDetailsData,
	error: null,
	isError: false,
	isPending: false,
};
