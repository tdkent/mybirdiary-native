import { APPWRITE_TABLE_IDS, CONFIG } from "@/constants/config";
import { tablesDB } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/error-messages";
import type { DbTables } from "@/types/db";
import { Query } from "react-native-appwrite";

interface Inputs {
	queryKey: DbTables;
	queries: string[];
}

/** Get list items with pagination and sorting. */
export async function getListData({ queryKey, queries }: Inputs) {
	try {
		const result = await tablesDB.listRows({
			databaseId: CONFIG.DATABASE_ID,
			tableId: APPWRITE_TABLE_IDS[queryKey],
			queries: [Query.select(queries)],
		});

		return result;
	} catch (e) {
		throw new Error(getErrorMessage(e));
	}
}
