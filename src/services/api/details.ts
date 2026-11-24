import { Query } from "react-native-appwrite";
import { APPWRITE_TABLE_IDS, CONFIG } from "@/constants/config";
import { tablesDB } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/get-error-message";
import type { RowFor, TableName } from "@/types/db";

/** Get a single row. */
export async function getDetailsData<T extends TableName>({
	queries,
	rowId,
	table,
}: {
	table: T;
	rowId: string;
	queries: string[];
}) {
	try {
		const row = await tablesDB.getRow<RowFor[T]>({
			databaseId: CONFIG.DATABASE_ID,
			tableId: APPWRITE_TABLE_IDS[table],
			rowId,
			queries: [Query.select(queries)],
		});

		return row;
	} catch (e) {
		throw new Error(getErrorMessage(e));
	}
}
