/** Configuration object with env variables. */
export const CONFIG = {
	APPWRITE_ENDPOINT: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string,
	APPWRITE_PLATFORM: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM as string,
	APPWRITE_PROJECT: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string,
	DATABASE_ID: process.env.EXPO_PUBLIC_DATABASE_ID as string,
	BIRDS_TABLE_ID: process.env.EXPO_PUBLIC_BIRDS_TABLE_ID as string,
	SIGHTINGS_TABLE_ID: process.env.EXPO_PUBLIC_SIGHTINGS_TABLE_ID as string,
} as const;

/** Object of Appwrite db table ids. */
export const APPWRITE_TABLE_IDS = {
	birds: CONFIG.BIRDS_TABLE_ID,
	sightings: CONFIG.SIGHTINGS_TABLE_ID,
};
