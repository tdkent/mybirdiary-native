import type { AppwriteListQuery, Bird } from "@/types/db";

// Appwrite list data types
export type ListQueryData = Pick<AppwriteListQuery, "total"> & {
	rows: Partial<Bird>[];
};

export interface ListQueryReturnValue {
	data: ListQueryData | undefined;
	error: Error | null;
	isError: boolean;
	isPending: boolean;
}

// Appwrite row data types
export type DetailsQueryData = Pick<
	Bird,
	"$id" | "commonName" | "description" | "scientificName"
>;

export interface DetailsQueryReturnValue {
	data: DetailsQueryData | undefined;
	error: Error | null;
	isError: boolean;
	isPending: boolean;
}
