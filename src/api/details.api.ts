import { config } from "@/config/config";
import { TABLE_IDS } from "@/constants/api.constants";
import { tablesDB } from "@/lib/appwrite";
import { getAppwriteException } from "@/services/errors/appwrite.error";
import type { Table } from "@/types/api.types";
import { Query } from "react-native-appwrite";

interface Inputs {
	rowId: string;
	table: Table;
}

/** Get a single row. */
export async function getDetailsData({ rowId, table }: Inputs) {
	try {
		const row = await tablesDB.getRow({
			databaseId: config.databaseId,
			tableId: TABLE_IDS[table],
			rowId,
			queries: [Query.select(["*"])],
		});

		return row;
	} catch (e) {
		throw new Error(getAppwriteException(e));
	}
}
