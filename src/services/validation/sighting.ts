import { TEN_YEARS_AGO, TODAY } from "@/constants/dates";
import { ERROR_MESSAGES } from "@/constants/messages";
import { VALIDATION } from "@/constants/validation";
import * as Yup from "yup";

const CommonName = Yup.string().required(ERROR_MESSAGES.SIGHTING_NAME_REQUIRED);

const SightingDate = Yup.date()
	.required(ERROR_MESSAGES.REQUIRED_DATE)
	.min(TEN_YEARS_AGO, ERROR_MESSAGES.INVALID_DATE)
	.max(TODAY, ERROR_MESSAGES.INVALID_DATE);

const Description = Yup.string().max(
	VALIDATION.DESCRIPTION_CHAR_LIMIT,
	ERROR_MESSAGES.SIGHTING_DESCRIPTION_LENGTH,
);

export const SightingSchema = Yup.object().shape({
	commonName: CommonName,
	date: SightingDate,
	description: Description,
});
