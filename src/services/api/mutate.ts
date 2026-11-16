import { CONFIG } from "@/constants/config";
import { tablesDB } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/error-messages";
import type { SightingMutationInputs } from "@/types/forms";
import { ID, Permission, Role } from "react-native-appwrite";

const birdId = "6af3a497003101bcab37"; // test id

/** Add a new sighting in Appwrite db. */
export async function createSighting({
	userId,
	formValues,
}: SightingMutationInputs) {
	try {
		await tablesDB.createRow({
			databaseId: CONFIG.DATABASE_ID,
			tableId: CONFIG.SIGHTINGS_TABLE_ID,
			rowId: ID.unique(),
			data: {
				bird: birdId,
				date: formValues.date,
				description: formValues.description,
			},
			permissions: [
				Permission.read(Role.user(userId)),
				Permission.update(Role.user(userId)),
				Permission.delete(Role.user(userId)),
			],
		});
	} catch (e) {
		throw new Error(getErrorMessage(e));
	}
}
