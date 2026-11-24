import type { Bird } from "@/types/db";

// Appwrite list data types
export interface ListQueryData {
	rows: Partial<Bird>[];
	total: number;
}

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
