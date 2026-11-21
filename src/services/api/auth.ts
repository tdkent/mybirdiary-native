import { account } from "@/lib/appwrite";
import type { UserAuthInputs } from "@/types/forms";

export async function createSession(values: UserAuthInputs) {
	await account.createEmailPasswordSession(values);

	const user = await account.get();

	return user;
}
