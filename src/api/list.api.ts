import { config } from "@/config/config";
import { tablesDB } from "@/lib/appwrite";
import { getAppwriteException } from "@/services/errors/appwrite.error";
import type { Table } from "@/types/api.types";
import { getTableId } from "@/utils/appwrite.utils";
import { Query } from "react-native-appwrite";

/** Get all birds */
export async function getListData(queryKey: Table) {
	try {
		const result = await tablesDB.listRows({
			databaseId: config.databaseId,
			tableId: getTableId(queryKey),
			queries: [Query.select(["*"])],
		});

		return result;
	} catch (e) {
		throw new Error(getAppwriteException(e));
	}
}
