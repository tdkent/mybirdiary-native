import { Query } from "react-native-appwrite";
import { CONFIG } from "@/constants/config";
import { tablesDB } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/get-error-message";
import type { RowFor, TableName } from "@/types/db";

/** Get list items with pagination and sorting. */
export async function getListData<T extends TableName>({
	tableId,
	queries,
}: {
	tableId: string;
	queries: string[];
}) {
	try {
		const result = await tablesDB.listRows<RowFor[T]>({
			databaseId: CONFIG.DATABASE_ID,
			tableId,
			queries: [Query.select(queries)],
		});

		return result;
	} catch (e) {
		throw new Error(getErrorMessage(e));
	}
}
