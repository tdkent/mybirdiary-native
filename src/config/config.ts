interface Config {
	appwriteEndpoint: string;
	appwritePlatform: string;
	appwriteProject: string;
}

export const config: Config = {
	appwriteEndpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string,
	appwritePlatform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM as string,
	appwriteProject: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string,
};
