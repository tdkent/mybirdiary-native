import { Query } from "react-native-appwrite";
import { APPWRITE_TABLE_IDS, CONFIG } from "@/constants/config";
import { tablesDB } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/get-error-message";
import type { RowFor, TableName } from "@/types/db";

/** Get list items with pagination and sorting. */
export async function getListData<T extends TableName>({
	table,
	queries,
}: {
	table: T;
	queries: string[];
}) {
	try {
		const result = await tablesDB.listRows<RowFor[T]>({
			databaseId: CONFIG.DATABASE_ID,
			tableId: APPWRITE_TABLE_IDS[table],
			queries: [Query.select(queries)],
		});

		return result;
	} catch (e) {
		throw new Error(getErrorMessage(e));
	}
}
