import { APPWRITE_TABLE_IDS, CONFIG } from "@/constants/config";
import { tablesDB } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/error-messages";
import type { DbTables } from "@/types/db";
import { Query } from "react-native-appwrite";

interface Inputs {
	queries: string[];
	rowId: string;
	table: DbTables;
}

/** Get a single row. */
export async function getDetailsData({ queries, rowId, table }: Inputs) {
	try {
		const row = await tablesDB.getRow({
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
