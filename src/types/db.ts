import type { Models } from "react-native-appwrite";

/** Bird db model. */
export type Bird = Models.Row & {
	commonName: string;
	description: string;
	scientificName: string;
};

/** Sighting db model */
export type Sighting = Models.Row & {
	bird: Bird | null;
	date: string;
	description: string;
};

/** Map tables to data types. */
export interface RowFor {
	birds: Bird;
	sightings: Sighting;
}

/** Queryable tables in db. */
export type DbTables = keyof RowFor;
