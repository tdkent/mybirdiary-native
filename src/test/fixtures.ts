import type { Bird, Sighting } from "@/types/db";
import type { DescriptionListItem } from "@/types/ui";

/* ── Auth ──────────────────────────────────────────── */

export const USER_ID = "user-123";
export const USER_EMAIL = "test@fake.me";

export const VALID_LOGIN = Object.freeze({
	email: USER_EMAIL,
	password: "password123",
});

export const INVALID_LOGIN = Object.freeze({
	email: "invalid-email",
	password: "abcd",
});

export const VALID_REGISTER = Object.freeze({
	...VALID_LOGIN,
	userId: USER_ID,
});

/* ── Birds ──────────────────────────────────────────── */
export const BIRD_GREEN_HERON: Pick<
	Bird,
	"$id" | "commonName" | "scientificName" | "description"
> = Object.freeze({
	$id: "bird-1234",
	commonName: "Green Heron",
	scientificName: "Butorides virescens",
	description: "A small heron with green plumage",
});

export const BIRD_BLUE_JAY: Pick<
	Bird,
	"$id" | "commonName" | "scientificName" | "description"
> = Object.freeze({
	$id: "bird-5678",
	commonName: "Blue Jay",
	scientificName: "Cyanocitta cristata",
	description: "A noisy jaybird with blue plumage",
});

export const BIRD_DETAILS: DescriptionListItem[] = [
	{
		label: "Common Name",
		details: BIRD_GREEN_HERON.commonName,
	},
	{
		label: "Scientific Name",
		details: BIRD_GREEN_HERON.scientificName,
	},
	{
		label: "Description",
		details: BIRD_GREEN_HERON.description,
	},
];

/* ── Sightings ──────────────────────────────────────────── */
export const SIGHTING_BASE: Pick<
	Sighting,
	"$id" | "date" | "description" | "bird"
> = Object.freeze({
	$id: "sighting-1234",
	date: "2026-11-01T00:00:00.000+00:00",
	description: "Fishing near a stream",
	bird: null,
});
