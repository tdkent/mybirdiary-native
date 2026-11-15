import { CONFIG } from "@/constants/config";
import { tablesDB } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/error-messages";
import type { SightingFormInputs } from "@/types/forms";
import { ID, Permission, Role } from "react-native-appwrite";

/** Add a new sighting in Appwrite db. */
export async function createSighting(values: SightingFormInputs) {
	try {
		const result = await tablesDB.createRow({
			databaseId: CONFIG.DATABASE_ID,
			tableId: CONFIG.SIGHTINGS_TABLE_ID,
			rowId: ID.unique(),
			data: values,
			permissions: [
				Permission.read(Role.user("<USER_ID>")),
				Permission.update(Role.user("<USER_ID>")),
				Permission.delete(Role.user("<USER_ID>")),
			],
		});

		console.log(result);
	} catch (e) {
		throw new Error(getErrorMessage(e));
	}
}
