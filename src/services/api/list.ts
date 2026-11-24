import { Query } from "react-native-appwrite";
import { CONFIG } from "@/constants/config";
import { TABLES } from "@/constants/tables";
import { tablesDB } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/get-error-message";
import type { RowFor, TableName } from "@/types/db";

/** Get list items. */
export async function getListData<T extends TableName>(table: T) {
	const { tableId, select } = TABLES[table];
	try {
		const result = await tablesDB.listRows<RowFor[T]>({
			databaseId: CONFIG.DATABASE_ID,
			tableId,
			queries: [Query.select(select)],
		});

		return result;
	} catch (e) {
		throw new Error(getErrorMessage(e));
	}
}
