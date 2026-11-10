import AuthForm from "@/components/forms/AuthForm";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { Link } from "expo-router";

export default function RegisterScreen() {
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">Create a new account</ThemedText>
			<AuthForm action="register" />

			<ThemedText>
				Already a member? <Link href="/login">Sign in</Link>
			</ThemedText>
		</ThemedSafeView>
	);
}
