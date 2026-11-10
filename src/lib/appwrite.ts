import { config } from "@/config/config";
import { Account, Client, TablesDB } from "react-native-appwrite";
import "react-native-url-polyfill";

export const client = new Client()
	.setEndpoint(config.appwriteEndpoint)
	.setPlatform(config.appwritePlatform)
	.setProject(config.appwriteProject);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
