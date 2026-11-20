import * as Yup from "yup";
import { ERROR_MESSAGES } from "@/constants/messages";
import { VALIDATION } from "@/constants/validation";
import { getEndOfToday, getOneYearAgoStartOfDay } from "@/utils/dates";

const CommonName = Yup.string().required(ERROR_MESSAGES.SIGHTING_NAME_REQUIRED);

const SightingDate = Yup.date()
	.required(ERROR_MESSAGES.REQUIRED_DATE)
	.test(
		"date-in-range",
		ERROR_MESSAGES.INVALID_DATE,
		(value) =>
			!value ||
			(value >= getOneYearAgoStartOfDay() && value <= getEndOfToday()),
	);

const Description = Yup.string().max(
	VALIDATION.DESCRIPTION_CHAR_LIMIT,
	ERROR_MESSAGES.SIGHTING_DESCRIPTION_LENGTH,
);

export const SightingSchema = Yup.object().shape({
	commonName: CommonName,
	date: SightingDate,
	description: Description,
});
