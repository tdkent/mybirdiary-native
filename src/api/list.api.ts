import { config } from "@/config/config";
import { TABLE_IDS } from "@/constants/api.constants";
import { tablesDB } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/error-messages";
import type { Table } from "@/types/api.types";
import { Query } from "react-native-appwrite";

/** Get list items with pagination and sorting. */
export async function getListData(queryKey: Table) {
	try {
		const result = await tablesDB.listRows({
			databaseId: config.databaseId,
			tableId: TABLE_IDS[queryKey],
			queries: [Query.select(["*"])],
		});

		return result;
	} catch (e) {
		throw new Error(getErrorMessage(e));
	}
}
