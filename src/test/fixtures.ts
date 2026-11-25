import type { DetailsQueryData } from "@/test/types";
import type { DescriptionListItem } from "@/types/ui";

/* ── Auth ──────────────────────────────────────────── */

export const USER_ID = "user-123";
export const USER_EMAIL = "test@fake.me";

export const VALID_LOGIN = {
	email: USER_EMAIL,
	password: "password123",
};
export const INVALID_LOGIN = {
	email: "invalid-email",
	password: "abcd",
};

export const VALID_REGISTER = {
	...VALID_LOGIN,
	userId: USER_ID,
};

export const AUTH_STATUS = {
	authenticated: "Authenticated",
	unauthenticated: "Unauthenticated",
	authChecked: "Checked",
	authUnchecked: "Unchecked",
};

/* ── Birds ──────────────────────────────────────────── */
export const BIRD_GREEN_HERON = Object.freeze({
	$id: "bird-1234",
	commonName: "Green Heron",
	scientificName: "Butorides virescens",
	description: "A small heron with green plumage",
});

export const BIRD_BLUE_JAY = Object.freeze({
	$id: "bird-5678",
	commonName: "Blue Jay",
	scientificName: "Cyanocitta cristata",
	description: "A noisy jaybird with blue plumage",
});

/** Details component */
export const mockDetailsData: DetailsQueryData = {
	$id: "1",
	commonName: "Green Heron",
	scientificName: "Butorides virescens",
	description: "A small heron",
};

export const mockDescriptionList: DescriptionListItem[] = [
	{
		label: "Common Name",
		details: "Blue Jay",
	},
	{
		label: "Scientific Name",
		details: "Cyanocitta cristata",
	},
	{
		label: "Description",
		details: "A loud blue corvid",
	},
];
