import type { AppwriteListQuery, Bird } from "@/types/models";

export type ListQueryData = Pick<AppwriteListQuery, "total"> & {
	rows: Partial<Bird>[];
};

export interface ListQueryReturnValue {
	data: ListQueryData | undefined;
	error: Error | null;
	isError: boolean;
	isPending: boolean;
}
