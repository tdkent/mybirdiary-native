import { config } from "@/config/config";
import type { Table } from "@/types/api.types";

export function getTableId(table: Table) {
	switch (table) {
		case "birds": {
			return config.birdsTableId;
		}

		default:
			throw new Error("Invalid query key!");
	}
}
