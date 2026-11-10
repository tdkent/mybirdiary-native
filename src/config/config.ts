interface Config {
	appwriteEndpoint: string;
	appwritePlatform: string;
	appwriteProject: string;
	databaseId: string;
	birdsTableId: string;
}

export const config: Config = {
	appwriteEndpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string,
	appwritePlatform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM as string,
	appwriteProject: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string,
	databaseId: process.env.EXPO_PUBLIC_DATABASE_ID as string,
	birdsTableId: process.env.EXPO_PUBLIC_BIRDS_TABLE_ID as string,
};
