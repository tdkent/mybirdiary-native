import { CONFIG } from "@/constants/config";
import { Account, Client, TablesDB } from "react-native-appwrite";
import "react-native-url-polyfill";

export const client = new Client()
	.setEndpoint(CONFIG.APPWRITE_ENDPOINT)
	.setPlatform(CONFIG.APPWRITE_PLATFORM)
	.setProject(CONFIG.APPWRITE_PROJECT);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
