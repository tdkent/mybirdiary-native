import { Link } from "expo-router";
import AuthForm from "@/components/forms/auth-form";
import ThemedSafeView from "@/components/ui/themed-safe-view";
import ThemedText from "@/components/ui/themed-text";

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
