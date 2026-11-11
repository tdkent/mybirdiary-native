import { config } from "@/config/config";
import { tablesDB } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";

/** Get all birds */
export async function getBirds() {
	try {
		const result = await tablesDB.listRows({
			databaseId: config.databaseId,
			tableId: config.birdsTableId,
			queries: [Query.select(["*"])],
		});

		return result;
	} catch (e) {
		console.error(e);
	}
}
