import type { Auth } from "@/context/auth-context";
import { mockDetailsData, mockListData } from "@/test/fixtures";
import type {
	DetailsQueryReturnValue,
	ListQueryReturnValue,
} from "@/test/types";

/** Auth context */
export const mockAuthContext: Auth = {
	error: "",
	isAuthChecked: false,
	isLoading: false,
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
	register: () => {},
	setError: () => {},
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
