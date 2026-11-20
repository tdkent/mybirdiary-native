import { DateTime } from "luxon";

/** Get current date/time as JS Date object. */
export const getToday = () => DateTime.now().toJSDate();

/** Get current date at start of day as JS Date object. */
export const getEndOfToday = () => DateTime.now().endOf("day").toJSDate();

/** Get current date minus one year as JS Date object. */
export const getOneYearAgo = () =>
	DateTime.now().minus({ years: 1 }).toJSDate();

/** Get start of date one year ago as JS Date object. */
export const getOneYearAgoStartOfDay = () =>
	DateTime.now().minus({ years: 1 }).startOf("day").toJSDate();
