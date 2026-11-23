import { Query } from "react-native-appwrite";
import { APPWRITE_TABLE_IDS, CONFIG } from "@/constants/config";
import { tablesDB } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/get-error-message";
import type { DbTables, RowFor } from "@/types/db";

interface Inputs<T> {
	queryKey: T;
	queries: string[];
}

/** Get list items with pagination and sorting. */
export async function getListData<T extends DbTables>({
	queryKey,
	queries,
}: Inputs<T>) {
	try {
		const result = await tablesDB.listRows<RowFor[T]>({
			databaseId: CONFIG.DATABASE_ID,
			tableId: APPWRITE_TABLE_IDS[queryKey],
			queries: [Query.select(queries)],
		});

		return result;
	} catch (e) {
		throw new Error(getErrorMessage(e));
	}
}
