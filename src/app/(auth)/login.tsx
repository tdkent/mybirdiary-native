import AuthForm from "@/components/forms/AuthForm";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { Link } from "expo-router";

export default function LoginScreen() {
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">Sign in</ThemedText>

			<AuthForm action="login" />

			<ThemedText>
				Don't have an account? <Link href="/register">Sign up</Link>
			</ThemedText>
		</ThemedSafeView>
	);
}
