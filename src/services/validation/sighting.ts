import { ERROR_MESSAGES } from "@/constants/messages";
import * as Yup from "yup";

const CommonName = Yup.string().required(ERROR_MESSAGES.SIGHTING_NAME_REQUIRED);

const Description = Yup.string().max(
	150,
	ERROR_MESSAGES.SIGHTING_DESCRIPTION_LENGTH,
);

export const SightingSchema = Yup.object().shape({
	commonName: CommonName,
	description: Description,
});
