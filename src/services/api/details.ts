import { Query } from "react-native-appwrite";
import { CONFIG } from "@/constants/config";
import { tablesDB } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/get-error-message";
import type { RowFor, TableName } from "@/types/db";

/** Get a single row. */
export async function getDetailsData<T extends TableName>({
	tableId,
	rowId,
	queries,
}: {
	tableId: string;
	rowId: string;
	queries: string[];
}) {
	try {
		const row = await tablesDB.getRow<RowFor[T]>({
			databaseId: CONFIG.DATABASE_ID,
			tableId,
			rowId,
			queries: [Query.select(queries)],
		});

		return row;
	} catch (e) {
		throw new Error(getErrorMessage(e));
	}
}
