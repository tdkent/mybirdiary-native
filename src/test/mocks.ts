import type { Models } from "react-native-appwrite";
import { ERROR_MESSAGES } from "@/constants/messages";
import type { Auth } from "@/context/auth-context";
import {
	BIRD_BLUE_JAY,
	BIRD_GREEN_HERON,
	mockDetailsData,
	USER_EMAIL,
	USER_ID,
} from "@/test/fixtures";
import type { DetailsQueryReturnValue } from "@/test/types";

/* ── Auth ──────────────────────────────────────────── */

/** Appwrite user */
export const MOCK_USER: Models.User<Models.Preferences> = {
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

/** Auth context default value */
export const MOCK_DEFAULT_AUTH_CONTEXT: Auth = {
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

/* ── Appwrite ──────────────────────────────────────────── */

/** Appwrite list with no rows */
export const MOCK_EMPTY_APPWRITE_LIST = {
	rows: [],
	total: 0,
};

/** Appwrite list with 2 bird results */
export const MOCK_APPWRITE_LIST_BIRDS = {
	rows: [BIRD_GREEN_HERON, BIRD_BLUE_JAY],
	total: 2,
};

/* ── Tanstack ──────────────────────────────────────────── */

/** useQuery default return value */
export const MOCK_DEFAULT_USE_QUERY = {
	data: undefined,
	error: null,
	isError: false,
	isPending: false,
};

/** useQuery while pending */
export const MOCK_USE_QUERY_LOADING = {
	...MOCK_DEFAULT_USE_QUERY,
	isPending: true,
};

/** useQuery with unexpected Appwrite server error */
export const MOCK_USE_QUERY_ERROR = {
	...MOCK_DEFAULT_USE_QUERY,
	isError: true,
	error: { message: ERROR_MESSAGES.APPWRITE_UNEXPECTED },
};

/** useQuery with empty Appwrite list */
export const MOCK_USE_QUERY_WITH_EMPTY_LIST = {
	...MOCK_DEFAULT_USE_QUERY,
	data: MOCK_EMPTY_APPWRITE_LIST,
};

/** useQuery with birds list */
export const MOCK_USE_QUERY_WITH_BIRDS_LIST = {
	...MOCK_DEFAULT_USE_QUERY,
	data: MOCK_APPWRITE_LIST_BIRDS,
};

/** Details component */
export const defaultDetailsReturnValue: DetailsQueryReturnValue = {
	data: mockDetailsData,
	error: null,
	isError: false,
	isPending: false,
};
