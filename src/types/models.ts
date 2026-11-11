import type { Models } from "react-native-appwrite";

export type AppwriteListQuery = Models.RowList<Models.DefaultRow>;

export type Bird = Models.Row & {
	commonName: string;
	description: string;
	scientificName: string;
};
