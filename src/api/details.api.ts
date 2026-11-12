import { config } from "@/config/config";
import { tablesDB } from "@/lib/appwrite";
import { getAppwriteException } from "@/services/errors/appwrite.error";
import type { Table } from "@/types/api.types";
import { getTableId } from "@/utils/appwrite.utils";
import { Query } from "react-native-appwrite";

interface Inputs {
	rowId: string;
	table: Table;
}

/** Get all birds */
export async function getDetailsData({ rowId, table }: Inputs) {
	try {
		const row = await tablesDB.getRow({
			databaseId: config.databaseId,
			tableId: getTableId(table),
			rowId,
			queries: [Query.select(["*"])],
		});

		return row;
	} catch (e) {
		throw new Error(getAppwriteException(e));
	}
}
