import { TABLES } from "@/constants/tables";
import type { TableName } from "@/types/db";

export const queryKeys = {
	all: ({ table, userId }: { table: TableName; userId?: string }) => {
		if (TABLES[table].userScoped) {
			return [table, userId] as const;
		}

		return [table] as const;
	},
	list: ({ table, userId }: { table: TableName; userId?: string }) => {
		const key = queryKeys.all({ table, userId });
		return [...key, "list"] as const;
	},
	detail: ({
		table,
		userId,
		rowId,
	}: {
		table: TableName;
		userId?: string;
		rowId: string;
	}) => {
		const key = queryKeys.all({ table, userId });
		return [...key, "detail", rowId] as const;
	},
};
