import type { Models } from "react-native-appwrite";

/** Db table names. */
export type DbTables = "birds" | "sightings";

/** Default Appwrite list query type. */
export type AppwriteListQuery = Models.RowList<Models.DefaultRow>;

/** Bird db model. */
export type Bird = Models.Row & {
	commonName: string;
	description: string;
	scientificName: string;
};

/** Sighting db model */
export type Sighting = Models.Row & {
	bird: Bird;
	date: Date;
	description: string;
};
