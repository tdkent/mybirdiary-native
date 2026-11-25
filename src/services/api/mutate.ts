import { ID, Permission, Role } from "react-native-appwrite";
import { CONFIG } from "@/constants/config";
import { TABLES } from "@/constants/tables";
import { tablesDB } from "@/lib/appwrite";
import { getErrorMessage } from "@/services/errors/get-error-message";
import type { SightingMutationInputs } from "@/types/forms";

const birdId = "6af3a497003101bcab37"; // TODO(MVP2)

/** Add a new sighting in Appwrite db. */
export async function createSighting({
	userId,
	formValues,
}: SightingMutationInputs) {
	try {
		await tablesDB.createRow({
			databaseId: CONFIG.DATABASE_ID,
			tableId: TABLES.sightings.tableId,
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
