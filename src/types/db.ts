import type { Models } from "react-native-appwrite";

/** Db table names. */
export type Table = "birds" | "sightings";

/** Default Appwrite list query type. */
export type AppwriteListQuery = Models.RowList<Models.DefaultRow>;

/** Bird db model. */
export type Bird = Models.Row & {
	commonName: string;
	description: string;
	scientificName: string;
};
