import { Account, Client } from "react-native-appwrite";
import { config } from "@/config/config";
import "react-native-url-polyfill";

const client = new Client()
	.setEndpoint(config.appwriteEndpoint)
	.setPlatform(config.appwritePlatform)
	.setProject(config.appwriteProject);

export const account = new Account(client);
