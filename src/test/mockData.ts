import type { ListQueryData, ListQueryReturnValue } from "@/test/types";

// useQuery return values
export const mockListData: ListQueryData = {
	rows: [
		{ $id: "1", commonName: "Blue Jay" },
		{ $id: "2", commonName: "Northern Cardinal" },
	],
	total: 2,
};

export const defaultReturnValue: ListQueryReturnValue = {
	data: mockListData,
	error: null,
	isError: false,
	isPending: false,
};
