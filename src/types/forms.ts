/** Auth form input types. */
export interface UserAuthInputs {
	email: string;
	password: string;
}

/** Sighting form input types */
export interface SightingFormInputs {
	commonName: string;
	date: Date;
	description: string;
}

export interface SightingMutationInputs {
	userId: string;
	formValues: SightingFormInputs;
}
