import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("Cannot use auth context outside of provider!");
	return context;
}
