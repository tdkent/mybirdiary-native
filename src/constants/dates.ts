import { DateTime } from "luxon";

export const TODAY = DateTime.now().toJSDate();
export const TEN_YEARS_AGO = DateTime.now().minus({ years: 10 }).toJSDate();
